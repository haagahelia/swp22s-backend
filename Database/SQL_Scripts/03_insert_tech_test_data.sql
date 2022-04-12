/* These are not yet signed ones */

INSERT INTO Task 
    (   uuid,
        order_type,
        country_code,

        pu_datetime,
        pu_address
    )
    VALUES 
    (   '620a6836cd684f6e0a7efebe',
        'restaurant',
        'FIN',

        '2022-04-12 08:20',
        'Kotitie 3, 99200 Oulu'),

    (   '780a7777cd684f6e0a7efaaa',
        'restaurant',
        'FIN',

        '2022-04-12 08:20',
        'Aurakatu 111, 00520 Helsinki'),
    
    (   '324852348sdfsaf8qwe57erf',
        'restaurant',
        'FIN',

        '2022-04-12 08:20',
        'Hupsubulevardi 800 A 3, 00770 Helsinki')
;


/* These are completed courier tasks, from zero to hero */
INSERT INTO Task 
    (   uuid, 
        order_type, 
        country_code,
        created_at, 
        pu_datetime,
        pu_address,
        pu_signature_image,
        pu_signed_at
        )
VALUES 
    (
        'f1kvrd7l3p8eqx7jnz9i9v66', 
        'restaurant',
        'FIN',
        '2022-04-12 08:20', 
        '2022-04-12 08:57',
        'Kujakatu 444, 04400 ESPOO',
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3Qm4NFlZJ/h/94CKClhAAbI0FCCFrCIooAjSsgiyWCq7raACCo2AiCA9DjIztoAoCLIU2oBrMWCzC7Io0Mgqm2yyyCZ7FTsjoPYM/bwYVy9JZGbkze1kxO88Tz3fV9+NOPGe3zn33sw3z/',
        '2022-04-12 11:11'    
    ),
    (
        'otttazldobll59mrjmrrjzck', 
        'restaurant',
        'FIN',
        '2022-04-12 08:20', 
        '2022-04-12 08:57',
        'Polkutie 8898, 88999 PORVOO',
        '',
        '2022-04-12 11:11'
    ),
    (
        '57x2xejexdfgdn1jeyokogrs', 
        'restaurant',
        'FIN',
        '2022-04-12 08:20', 
        '2022-04-12 08:57',
        'Sepeliaukea 313, 03300 ANKKALINNA',
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QfUdVlZJ/h/T9sKCBIUFFChlKBkBJuoBTOCosSxC6UNBBUjAoqi3a5BVq9uQUVCiQFFQESUmm5AaBgYFUslCpaolJIEBFGCFAgi2D3NrAfOwVuXm98b9jnnt9f61vd+73vCs397f/e957k7/KsoBAgQIECAAAECBAgQIECAAAECBAg0K/',
        '2022-04-12 11:11'
    ),
    (
        '775b72uez5rrqn3yoebwz9em', 
        'restaurant',
        'AUS',
        '2022-04-12 08:20', 
        '2022-04-12 08:57',
        'Ryysypolku 888, 08800 ROOPELA',
        'iVBORw0KGgoAAAANSUhEUgAABPAAAAK8CAYAAABhiUEuAAAAAXNSR0IArs4c6QAAIABJREFUeF7s3QnYdWdZH/p/T2trlcGooIAIoQgy1JBiZVAJXALKIIOe5BStTCooKIMgqPWckMuhKEoSKCgok6hoUgmTUIY2RAVE4CRQoBKGADKoUMNkq73aw7nuuLbd7Oxh7f2uvfcafs91fdcX+NZ61vP8nvW937vv936e+x9EI0CAAAECBAgQIECAAAECBAgQIECgtwL/',
        '2022-04-12 11:11'
    )
;
