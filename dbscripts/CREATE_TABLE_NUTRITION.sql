-- Table: public.nutritions

-- DROP TABLE public.nutritions;

CREATE TABLE public.nutritions
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    Business_owner_id uuid NOT NULL,
    category_id uuid NOT NULL,
	name citext DEFAULT NULL,
	url citext DEFAULT NULL,
	description citext DEFAULT NULL,	
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT nutritions_pkey PRIMARY KEY (id),
    CONSTRAINT Business_owner_id_fkey FOREIGN KEY (Business_owner_id)
        REFERENCES public.business_owners (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.nutritions
    OWNER to postgres;