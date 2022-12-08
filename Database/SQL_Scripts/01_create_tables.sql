/* --- CREATE TABLES --- */
CREATE TABLE IF NOT EXISTS Country (
    id          CHAR(3)         NOT NULL,
    name        VARCHAR(60)     UNIQUE NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS OrderType (
    order_type      VARCHAR(25)     NOT NULL,
    
    PRIMARY KEY (order_type)
);


CREATE TABLE IF NOT EXISTS Task (
    uuid                CHAR(24)        UNIQUE NOT NULL,
    order_type          VARCHAR(25)     NOT NULL,
    country_code        CHAR(3)         NOT NULL,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP(),
    pu_planned_time     TIMESTAMP       NOT NULL,     
    pu_address          VARCHAR(255)    NOT NULL,   
    courier             INT             NULL,


    pu_signature_image  LONGTEXT,
    pu_signed_at        TIMESTAMP       NULL ON UPDATE CURRENT_TIMESTAMP(),
    
    PRIMARY KEY (uuid),
    CONSTRAINT fk_OrderType FOREIGN KEY (order_type) REFERENCES OrderType(order_type),
    CONSTRAINT fk_Country FOREIGN KEY (country_code) REFERENCES Country(id),
    CONSTRAINT fk_Courier FOREIGN KEY (courier) REFERENCES User(userId) 
);

CREATE TABLE IF NOT EXISTS User (
    userId                INT             NOT NULL AUTO_INCREMENT,
    email                 VARCHAR(20)     UNIQUE NOT NULL,
    phone                 VARCHAR(11)     UNIQUE NOT NULL,
    firstName             VARCHAR(24)     NOT NULL,
    lastName              VARCHAR(24)     NOT NULL,
    pword                 VARCHAR(100)    NOT NULL,
    roles                 INT             NOT NULL DEFAULT 0,
    PRIMARY KEY (userId), 
    CONSTRAINT fk_Role FOREIGN KEY (roles) REFERENCES Roles(roleId)   

);

CREATE TABLE IF NOT EXISTS Roles (
    roleId  INT           UNIQUE NOT NULL,
    explanation                 VARCHAR(50)     NOT NULL, 
    PRIMARY KEY (roleId)  

);
