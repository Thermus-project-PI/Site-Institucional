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

