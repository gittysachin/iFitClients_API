-- Table: public.locations

-- DROP TABLE public.locations;

CREATE TABLE public.locations
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name citext COLLATE pg_catalog."default",
    type citext COLLATE pg_catalog."default",
    address1 citext COLLATE pg_catalog."default",
    address2 citext COLLATE pg_catalog."default",
    city citext COLLATE pg_catalog."default",
    state citext COLLATE pg_catalog."default",
    zipcode citext COLLATE pg_catalog."default",
    lat citext COLLATE pg_catalog."default",
    "long" citext COLLATE pg_catalog."default",
    CONSTRAINT locations_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.locations
    OWNER to postgres;