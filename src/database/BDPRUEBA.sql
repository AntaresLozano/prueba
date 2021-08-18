CREATE DATABASE BDPRUEBA;

USE BDPRUEBA;

CREATE TABLE agentes(
    IdAgente int NOT NULL,
    Nombre varchar (50) NOT NULL,
    PK_Agentes int PRIMARY KEY
);

CREATE TABLE Ciudades(
    IdCiudad int NOT NULL,
    Codigo varchar (50) NOT NULL,
    Nombre varchar (50) NOT NULL,
    IdDepartamento int  NOT NULL,
    PK_Ciudades int PRIMARY KEY
);

CREATE TABLE Clientes(
    IdCliente int NOT NULL,
    Nombre varchar (50) NOT NULL,
    Direccion varchar (50) NOT NULL,
    Telefono varchar  (50) NULL,
    Tipo varchar  (50) NULL,
    IdCiudad int NULL,
    PK_Ciudades int PRIMARY KEY
);

CREATE TABLE Departamentos(
    IdDepartamento int NOT NULL,
    Codigo varchar (50) NULL,
    Nombre varchar (50) NULL,
    PK_Departamentos int PRIMARY KEY
);

CREATE TABLE Etapas(
    IdEtapa int NOT NULL,
    Nombre varchar (50) NULL,
    PK_Etapas int PRIMARY KEY
);

CREATE TABLE Oportunidades(
    IdOportunidad int NOT NULL,
    IdCliente int NOT NULL,
    IdAgente int NOT NULL,
    Trimestre int NOT NULL,
    IdEtapa int NOT NULL,
    Valor decimal (18, 2) NOT NULL,
    PK_Oportunidades int PRIMARY KEY
);

INSERT INTO Agentes (IdAgente, Nombre) VALUES (1, 'Kevin Andrés Lozano');
INSERT INTO Agentes (IdAgente, Nombre) VALUES (2, 'Angel david nikolay');
INSERT INTO Agentes (IdAgente, Nombre) VALUES (3, 'Luisa Fernanda gutierres');

INSERT INTO Ciudades (IdCiudad, Codigo, Nombre, IdDepartamento) VALUES (21, N'05093', N'BETULIA', 1);
INSERT INTO Ciudades (IdCiudad, Codigo, Nombre, IdDepartamento) VALUES (561, N'05101', N'ANGELOPOLIS', 3);
