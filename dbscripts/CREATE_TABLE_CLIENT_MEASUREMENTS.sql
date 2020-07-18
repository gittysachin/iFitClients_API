-- Table: public.client_measurements

-- DROP TABLE public.client_measurements;

CREATE TABLE public.client_measurements
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    measurement_date timestamp with time zone,
    weight numeric DEFAULT 0,
    height numeric DEFAULT 0,
    body_fat_percentage numeric DEFAULT 0,
    waist numeric DEFAULT 0,
    hips numeric DEFAULT 0,
    thighs numeric DEFAULT 0,
    chest numeric DEFAULT 0,
    neck numeric DEFAULT 0,
    upper_arms numeric DEFAULT 0,
    fore_arms numeric DEFAULT 0,
    calves numeric DEFAULT 0,
    dob citext COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    CONSTRAINT client_measurements_pkey PRIMARY KEY (id),
    CONSTRAINT users_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.client_measurements
    OWNER to postgres;