CREATE TABLE Task 
(
    uuid        CHAR(24)        UNIQUE NOT NULL,
    pu_address  VARCHAR(255)    NOT NULL,

    CONSTRAINT pk_Task PRIMARY KEY(uuid) 
);
