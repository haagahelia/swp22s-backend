CREATE TABLE IF NOT EXISTS Country (
    id          CHAR(3)         NOT NULL,
    name        VARCHAR(60)     UNIQUE NOT NULL,

    CONSTRAINT pk_Country PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS OrderType (
    order_type      VARCHAR(25)     NOT NULL,
    
    CONSTRAINT pk_OrderType PRIMARY KEY (order_type)
);

/*
I added created_at column just to know when the Task is created,
if not needed, of course we can remove it
*/

/* Juhani: What is TIMESTAMP   NULL,  ?  
And wasn't pu_signature_image BLOB?
*/

CREATE TABLE IF NOT EXISTS Task (
    uuid                CHAR(24)        UNIQUE NOT NULL,
    order_type          VARCHAR(25)     NOT NULL,
    country_code        CHAR(3)         NOT NULL,
    created_at          TIMESTAMP       DEFAULT CURRENT_TIMESTAMP(),
    pu_datetime         TIMESTAMP       NULL,
    pu_address          VARCHAR(255),   
    pu_signature_image  TEXT,
    pu_signed_at        TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(),
    
    CONSTRAINT pk_Task PRIMARY KEY (uuid),
    CONSTRAINT fk_OrderType FOREIGN KEY (order_type) REFERENCES OrderType(order_type),
    CONSTRAINT fk_Country FOREIGN KEY (country_code) REFERENCES Country(id) 
);

/*
CREATE TABLE Task 
(
    uuid        CHAR(24)        UNIQUE NOT NULL,
    pu_address  VARCHAR(255)    NOT NULL,

    CONSTRAINT pk_Task PRIMARY KEY(uuid) 
);
*/