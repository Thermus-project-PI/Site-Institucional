create database thermus;
use thermus;

create table museu(
id int primary key auto_increment,
museuNome varchar(100),
email varchar(100),
cnpj char(14),
criadoEm datetime default current_timestamp(),
ativo tinyint
);

create table sensor(
id int auto_increment,
quadroNome varchar(100),
localizacao varchar(100),
salaId int,
fk_museu int,
instaladoEm datetime default current_timestamp(),
status varchar(20),

primary key(id, fk_museu),

constraint fk_museu_sensor 
foreign key (fk_museu) references museu(id),

constraint chk_status
CHECK (status IN ('ativo', 'inativo'))
);


create table alerta(
id int auto_increment,
fk_sensor int,
descricao varchar(255),
resolvido tinyint,
criadoEM datetime default current_timestamp(),
primary key(id, fk_sensor),
constraint fk_sensor_alerta foreign key (fk_sensor) references sensor(id)
);

create table leitura(
id int auto_increment,
fk_sensor int,
temperatura decimal(5,2),
umidade decimal(5,2),
pontoOrvalho decimal(5,2),
dataHora datetime default current_timestamp,

primary key(id, fk_sensor),

constraint fk_sensor_leitura foreign key (fk_sensor) references sensor(id)
);

create table funcionarios(
id int auto_increment,
nome varchar(100),
cargo varchar(100),
email varchar(100),
senha varchar(100),
fk_museu int,
fk_chefe int,
cadastradoEm datetime default current_timestamp(),

primary key(id, fk_museu),

constraint fk_museu_funcionarios foreign key (fk_museu) 
references museu(id),

constraint fk_chefe foreign key (fk_chefe) references funcionarios(id)
);


-- Lista todos os sensores com o nome do museu.
SELECT 
    s.id AS sensor_id,
    s.quadroNome,
    s.localizacao,
    m.museuNome
FROM sensor s
JOIN museu m ON s.fk_museu = m.id;

-- dados coletados pelos sensores.
SELECT 
    l.id AS leitura_id,
    s.quadroNome,
    l.temperatura,
    l.umidade,
    l.pontoOrvalho,
    l.dataHora
FROM leitura l
JOIN sensor s ON l.fk_sensor = s.id;


-- alertas com o sensor
SELECT 
    a.id AS alerta_id,
    s.quadroNome,
    a.descricao,
    a.resolvido,
    a.criadoEM
FROM alerta a
JOIN sensor s ON a.fk_sensor = s.id;

-- Funcionários + Chefe
SELECT 
    f.nome AS funcionario,
    c.nome AS chefe
FROM funcionarios f
LEFT JOIN funcionarios c ON f.fk_chefe = c.id;


-- Sensor + Museu + Leituras 
SELECT 
    m.museuNome,
    s.quadroNome,
    l.temperatura,
    l.umidade,
    l.dataHora
FROM leitura l
JOIN sensor s ON l.fk_sensor = s.id
JOIN museu m ON s.fk_museu = m.id;

select * from sensor_museu_leitura_vw;

                                    /*VIEW DASHBOARD*/
-- temperatura media

create view temperatura_media_vw as
select round(avg(temperatura),1) as temperatura_media
from leitura
where date(datahora) = curdate();


-- umidade media

create view umidade_media_vw as
select round(avg(umidade),1) as umidade_media
from leitura
where date(datahora) = curdate();


-- calculo do ponto de orvalho

create view calculo_ponto_orvalho_vw as
select round(avg(temperatura) - ((100 - avg(umidade)) / 5),1) as ponto_orvalho
from leitura
where date(datahora) = curdate();


-- card de alertas

create view alertas_dashboard_vw as
select count(*) as total_alertas,
sum(case
	when resolvido = 0 then 1
	else 0
	end) as pendentes
from alerta
where date(criadoem) = curdate();


-- grafico da temperatura

create view grafico_temperatura_vw as
select hour(datahora) as hora,
round(avg(temperatura),1) as temperatura_media
from leitura
where date(datahora) = curdate()
group by hour(datahora)
order by hora;


-- grafico da umidade

create view grafico_umidade_vw as
select
hour(datahora) as hora,
round(avg(umidade),1) as umidade_media
from leitura
where date(datahora) = curdate()
group by hour(datahora)
order by hora;


-- ultimos alertas do dia

create view ultimos_alertas_dia_vw as
select
a.id, s.quadronome, l.temperatura, l.umidade, a.descricao, a.criadoem,
case
    when (
        l.temperatura - l.pontoorvalho
    ) <= 2
    then 'critico'
    when (
        l.temperatura - l.pontoorvalho
    ) <= 5
    then 'atencao'
    else 'ok'
end as status_alerta
from alerta a
join sensor s on s.id = a.fk_sensor
join leitura l on l.fk_sensor = s.id
where date(a.criadoem) = curdate()
order by a.criadoem desc;

                                /*VIEW OBRAS*/
-- resumo dos sensores

create view resumo_sensor_vw as
select
    s.id as sensor_id,
    s.quadronome,round(avg(l.temperatura),1) as temp_media,
	round(avg(l.umidade),1) as umidade_media,
    round(avg(l.pontoorvalho),1) as ponto_orvalho,
    count(a.id) as total_alertas
from sensor s
left join leitura l
    on s.id = l.fk_sensor
left join alerta a
    on s.id = a.fk_sensor
group by s.id, s.quadronome;


-- grafico individual da temperatura

create view grafico_temperatura_sensor_vw as
select
s.quadronome,
hour(l.datahora) as hora,
l.temperatura
from leitura l
join sensor s on s.id = l.fk_sensor
order by l.datahora;


-- grafico individual da umidade

create view grafico_umidade_sensor_vw as
select s.quadronome,
hour(l.datahora) as hora,
l.umidade
from leitura l
join sensor s on s.id = l.fk_sensor
order by l.datahora;
                                 /*VIEW ALERTAS*/
                                                 
-- lista completa de alertas

create view lista_alertas_vw as
select a.id, a.criadoem, s.quadronome, l.temperatura, l.umidade, l.pontoorvalho,
round( l.temperatura - l.pontoorvalho, 1) as diferenca, case
when (l.temperatura - l.pontoorvalho) <= 2
	then 'critico'
    when ( l.temperatura - l.pontoorvalho ) <= 5
        then 'atencao'
        else 'ok'
    end as status_alerta
from alerta a
join sensor s on s.id = a.fk_sensor
join leitura l on l.fk_sensor = s.id;


-- estatisticas dos alertas

create view estatistica_alerta_vw as
select count(*) as total,
sum(case
        when (temperatura - pontoorvalho) <= 5
        and (temperatura - pontoorvalho) > 2
        then 1
        else 0
    end) as atencao,
sum(case
        when (temperatura - pontoorvalho) <= 2
        then 1
        else 0
    end) as critico from leitura;
                                                 
                                 /*VIEW RELATORIOS*/

-- relatorio semanal

create view relatorio_semanal_vw as
select
s.quadronome,
dayname(l.datahora) as dia_semana,
max(l.temperatura) as temperatura_maxima,
round(avg(l.umidade),1) as umidade_media,
round(avg(l.pontoorvalho),1) as ponto_orvalho,
case
    when max(l.temperatura - l.pontoorvalho) <= 2
then 'critico'
when max(l.temperatura - l.pontoorvalho) <= 5
then 'atencao'
else 'ok'
end as status
from leitura l
join sensor s on s.id = l.fk_sensor
group by s.quadronome, dayname(l.datahora);


-- estatisticas gerais

create view estatisticas_gerais_vw as
select
round(avg(temperatura),1) as temp_media,
max(temperatura) as temp_maxima,
round(avg(umidade),1) as umidade_media,
round(avg(pontoorvalho),1) as ponto_orvalho_medio
from leitura;


-- sensor com mais alertas

create view sensor_mais_alertas_vw as
select
s.quadronome,
count(a.id) as total_alertas
from sensor s
join alerta a on s.id = a.fk_sensor
group by s.id
order by total_alertas desc;


-- ocorrencias por sensor

create view ocorrencias_sensor_vw as
select
s.quadronome,
count(a.id) as ocorrencias
from sensor s
left join alerta a on s.id = a.fk_sensor
group by s.id;
