-- Table: public.categories

-- DROP TABLE public.categories;

CREATE TABLE public.categories
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name citext COLLATE pg_catalog."default",
    type citext COLLATE pg_catalog."default",
    business_owner_id uuid NOT NULL,
	created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
	is_active boolean DEFAULT true,
    CONSTRAINT categories_pkey PRIMARY KEY (id),
	CONSTRAINT business_owner_id_categories_fkey FOREIGN KEY (business_owner_id)
        REFERENCES public.business_owners (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.categories
    OWNER to postgres;