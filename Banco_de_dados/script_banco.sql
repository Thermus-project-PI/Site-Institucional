create database thermus;
use thermus;

create table museu(
id int primary key auto_increment,
museuNome varchar(100),
email varchar(100),
cnpj char(14),
criadoEm datetime,
ativo tinyint
);

create table sensor(
id int auto_increment,
quadroNome varchar(100),
localizacao varchar(100),
salaId int,
fk_museu int,
status varchar(20),

primary key(id, fk_museu),

constraint fk_museu foreign key (fk_museu) 
references museu(id),

constraint chk_status
CHECK (status IN ('ativo', 'inativo'))
);


create table alerta(
id int auto_increment,
fk_sensor int,
descricao varchar(255),
resolvido tinyint,
criadoEM datetime,
primary key(id, fk_sensor),
constraint fk_sensor foreign key (fk_sensor) references sensor(id)
);

create table leitura(
id int auto_increment,
fk_sensor1 int,
temperatura decimal(5,2),
umidade decimal(5,2),
pontoOrvalho decimal(5,2),
dataHora datetime,

primary key(id, fk_sensor1),

constraint fk_sensor1 foreign key (fk_sensor1) references sensor(id)
);

create table funcionarios(
id int auto_increment,
nome varchar(100),
cargo varchar(100),
email varchar(100),
senha varchar(100),
fk_museu int,
fk_chefe int,

primary key(id, fk_museu),

constraint fk_museu1 foreign key (fk_museu1) 
references museu(id),

constraint fk_chefe foreign key (fk_chefe) references funcionarios(id)
);

