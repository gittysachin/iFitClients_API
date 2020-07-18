-- Table: public.business_owners

-- DROP TABLE public.business_owners;

CREATE TABLE public.business_owners
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    business_name citext COLLATE pg_catalog."default",
    business_logo_url citext COLLATE pg_catalog."default",
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    location_id uuid,
    facility_code citext COLLATE pg_catalog."default",
    is_active boolean DEFAULT true,
    CONSTRAINT business_owners_pkey PRIMARY KEY (id),
    CONSTRAINT business_owner_location_fkey FOREIGN KEY (location_id)
        REFERENCES public.locations (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.business_owners
    OWNER to postgres;