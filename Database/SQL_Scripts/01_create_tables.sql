CREATE TABLE Order 
(
    uuid        CHAR(24)        NOT NULL,
    pu_address  VARCHAR(255)    NOT NULL,

    CONSTRAINT pk_Order PRIMARY KEY(uuid) 
);