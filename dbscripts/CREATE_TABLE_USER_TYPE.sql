-- Table: public.user_type

-- DROP TABLE public.user_type;

CREATE TABLE public.user_type
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    type citext COLLATE pg_catalog."default",
    description citext COLLATE pg_catalog."default",
    CONSTRAINT user_type_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_type
    OWNER to postgres;