INSERT INTO Country (id, name)
VALUES
    ('AUS', 'Australia'),
    ('CAN', 'Canada'),
    ('DNK', 'Denmark'),
    ('ETH', 'Ethiopia'),
    ('FIN', 'Finland'),
    ('DEU', 'Germany'),
    ('HUN', 'Hungary'),
    ('ITA', 'Italy'),
    ('JPN', 'Japan'),
    ('KOR', 'South Korea'),
    ('LUX', 'Luxembourg'),
    ('MDG', 'Madagascar'),
    ('VNM', 'Viet Nam');

INSERT INTO OrderType (order_type)
VALUES
    ('drive'),
    ('restaurant'),
    ('retail');

INSERT INTO User 
VALUES 
    (8645386, 'seppo@talo.fi', '0489678413', 'Seppo', 'Taalasmaa', 'seppo69'),
     (4898766, 'ismo@kauppa.fi', '0468413543', 'Ismo', 'Laitela', 'isMoisBest123');

INSERT INTO User_Roles
VALUES (8645386, 'courier'), (4898766, 'taskplanner');


