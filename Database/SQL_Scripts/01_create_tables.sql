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

    pu_signature_image  LONGTEXT,
    pu_signed_at        TIMESTAMP       NULL ON UPDATE CURRENT_TIMESTAMP(),
    
    PRIMARY KEY (uuid),
    CONSTRAINT fk_OrderType FOREIGN KEY (order_type) REFERENCES OrderType(order_type),
    CONSTRAINT fk_Country FOREIGN KEY (country_code) REFERENCES Country(id) 
);

