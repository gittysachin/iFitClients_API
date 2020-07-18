-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_type_id uuid NOT NULL,
    first_name citext COLLATE pg_catalog."default",
    last_name citext COLLATE pg_catalog."default",
    avatar_uri citext COLLATE pg_catalog."default",
    phone citext COLLATE pg_catalog."default",
    email citext COLLATE pg_catalog."default",
    salutation citext COLLATE pg_catalog."default",
    credentials citext COLLATE pg_catalog."default",
    dob citext COLLATE pg_catalog."default",
    about citext COLLATE pg_catalog."default",
    sex citext COLLATE pg_catalog."default",
    location_id uuid NOT NULL,
    last_login_date timestamp with time zone,
    facility_code citext COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    bownerid uuid,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_location_id_fkey FOREIGN KEY (location_id)
        REFERENCES public.locations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT users_user_type_id_fkey FOREIGN KEY (user_type_id)
        REFERENCES public.user_type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;