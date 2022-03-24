CREATE TABLE ENDERECOS
(
  ID_ENDERECO INT NOT NULL IDENTITY,
  RUA VARCHAR(50) NOT NULL,
  BAIRRO VARCHAR(100) NOT NULL,
  NUMERO VARCHAR(6) NOT NULL,
  CIDADE VARCHAR(50) NOT NULL,
  UF VARCHAR (2) NOT NULL,
  COMPLEMENTO VARCHAR(100),
  CONSTRAINT PK_ID_ENDERECO PRIMARY KEY (ID_ENDERECO)
)
CREATE TABLE SETORES
(
  ID_SETOR INT NOT NULL IDENTITY,
  NOME_SETOR VARCHAR(200) NOT NULL,
  CONSTRAINT PK_ID_SETOR PRIMARY KEY (ID_SETOR)
)
CREATE TABLE CLIENTES
(
  NOME VARCHAR(200) NOT NULL,
  CPF VARCHAR(11) NOT NULL,
  RG VARCHAR(9) NOT NULL,
  DATA_NASCIMENTO DATE NOT NULL,
  ID_ENDERECO INT NOT NULL,
  CONSTRAINT PK_ID_CLIENTE PRIMARY KEY (CPF),
  CONSTRAINT FK_ID_ENDERECO FOREIGN KEY (ID_ENDERECO) REFERENCES ENDERECOS(ID_ENDERECO)
)

CREATE TABLE FUNCIONARIOS
(
  CODIGO_REGISTRO INT NOT NULL IDENTITY,
  NOME VARCHAR(200) NOT NULL,
  CPF VARCHAR(11) NOT NULL,
  RG VARCHAR(9) NOT NULL,
  DATA_NASCIMENTO SMALLDATETIME NOT NULL,
  id_endereco INT NOT NULL,
  CONSTRAINT PK_ID_COD_REGISTRO PRIMARY KEY (CODIGO_REGISTRO),
  CONSTRAINT FK_FUNC_ID_ENDERECO FOREIGN KEY (ID_ENDERECO) REFERENCES ENDERECOS(ID_ENDERECO)
)

CREATE TABLE TELEFONES
(
  ID_TELEFONE INT NOT NULL IDENTITY,
  ID_CLIENTE VARCHAR(11) NOT NULL,
  TELEFONE VARCHAR(14) NOT NULL,
  CONSTRAINT PK_ID_TELEFONE PRIMARY KEY (ID_TELEFONE),
  CONSTRAINT FK_TELEFONE_ID_CLIENTE FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTES(CPF)
)

CREATE TABLE VEICULOS
(
  RENAVAM VARCHAR(11) NOT NULL,
  CHASSI VARCHAR(50) NOT NULL,
  MARCA VARCHAR(50) NOT NULL,
  MODELO VARCHAR(50) NOT NULL,
  ANO_FABRICACAO SMALLDATETIME NOT NULL,
  ANO_MODELO SMALLDATETIME NOT NULL,
  ID_CLIENTE VARCHAR(11) NOT NULL,
  CONSTRAINT PK_ID_RENAVAM PRIMARY KEY (RENAVAM),
  CONSTRAINT FK_ID_CLIENTE FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTES (CPF)
)

CREATE TABLE FUNCIONARIOS_SETORES
(
  ID_FUNCIONARIO INT NOT NULL,
  ID_SETOR INT NOT NULL,
  CONSTRAINT FK_FUNCSETORES_ID_FUNCIONARIO FOREIGN KEY (ID_FUNCIONARIO) REFERENCES FUNCIONARIOS(CODIGO_REGISTRO),
  CONSTRAINT FK_FUNCSETORES_ID_SETOR FOREIGN KEY (ID_SETOR) REFERENCES SETORES(ID_SETOR)
)

CREATE TABLE SERVICOS
(
  ID_SERVICO INT NOT NULL IDENTITY,
  TEMPO_EXECUCAO TIME NOT NULL,
  DATA_REGISTRO SMALLDATETIME NOT NULL,
  ID_SETOR INT NOT NULL,
  ID_VEICULO VARCHAR(11) NOT NULL,
  CONSTRAINT PK_ID_SERVICO PRIMARY KEY (ID_SERVICO),
  CONSTRAINT FK_ID_SETOR FOREIGN KEY (ID_SETOR) REFERENCES SETORES(ID_SETOR),
  CONSTRAINT FK_ID_VEICULO FOREIGN KEY (ID_VEICULO) REFERENCES VEICULOS(RENAVAM)
)

CREATE TABLE AGENDAMENTOS
(
  ID_AGENDAMENTO INT IDENTITY,
  DATA_AGENDAMENTO SMALLDATETIME NOT NULL,
  ID_SERVICO INT NOT NULL,
  CONSTRAINT PK_ID_AGENDAMENTO PRIMARY KEY (ID_AGENDAMENTO),
  CONSTRAINT FK_ID_SERVICO FOREIGN KEY (ID_SERVICO) REFERENCES SERVICOS(ID_SERVICO)
)
CREATE TABLE TIPOS_SERVICOS
(
  ID_TIPO_SERVICO INT NOT NULL IDENTITY,
  TIPO_SERVICO VARCHAR(200) NOT NULL,
  ID_SETOR INT NOT NULL,
  CONSTRAINT PK_ID_TIPO_SERVICO PRIMARY KEY(ID_TIPO_SERVICO),
  CONSTRAINT FK_TIPO_SERVICO_ID_SETOR FOREIGN KEY (ID_SETOR) REFERENCES SETORES(ID_SETOR)
)
