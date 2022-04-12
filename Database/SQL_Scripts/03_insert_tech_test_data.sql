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
    ('PRK', 'Korea'),
    ('LUX', 'Luxembourg'),
    ('MDG', 'Madagascar'),
    ('VNM', 'Viet Nam');

INSERT INTO OrderType (order_type)
VALUES
    ('drive'),
    ('restaurant'),
    ('retail');

INSERT INTO Task (uuid, pu_address)
    VALUES 
    ('620a6836cd684f6e0a7efebe',
        'Kotitie 3, 99200 Oulu'),
    ('780a7777cd684f6e0a7efaaa',
        'Aurakatu 111, 00520 Helsinki')
;



INSERT INTO Task (uuid, order_type, country_code, pu_signature_image)
VALUES 
    (
        'f1kvrd7l3p8eqx7jnz9i9v66', 
        'drive',
        'FIN', 
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3Qm4NFlZJ/h/94CKClhAAbI0FCCFrCIooAjSsgiyWCq7raACCo2AiCA9DjIztoAoCLIU2oBrMWCzC7Io0Mgqm2yyyCZ7FTsjoPYM/bwYVy9JZGbkze1kxO88Tz3fV9+NOPGe3zn33sw3z/'
    ),
    (
        'otttazldobll59mrjmrrjzck', 
        'retail',
        'ETH', 
        ''
    ),
    (
        '57x2xejexdfgdn1jeyokogrs', 
        'restaurant', 
        'FIN',
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QfUdVlZJ/h/T9sKCBIUFFChlKBkBJuoBTOCosSxC6UNBBUjAoqi3a5BVq9uQUVCiQFFQESUmm5AaBgYFUslCpaolJIEBFGCFAgi2D3NrAfOwVuXm98b9jnnt9f61vd+73vCs397f/e957k7/KsoBAgQIECAAAECBAgQIECAAAECBAg0K/'
    ),
    (
        '775b72uez5rrqn3yoebwz9em', 
        'retail', 
        'AUS',
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QnYdWdZH/p/T2trlcGooIAIoQgy1JBiZVAJXALKIIOe5BStTCooKIMgqPWckMuhKEoSKCgok6hoUgmTUIY2RAVE4CRQoBKGADKoUMNkq73aw7nuuLbd7Oxh7f2uvfcafs91fdcX+NZ61vP8nvW937vv936e+x9EI0CAAAECBAgQIECAAAECBAgQIECgtwL/'
    );