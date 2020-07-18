-- Table: public.workouts

-- DROP TABLE public.workouts;

CREATE TABLE public.workouts
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    Business_owner_id uuid NOT NULL,
    category_id uuid NOT NULL,
	url citext DEFAULT NULL,	
	name citext DEFAULT NULL,
	description citext DEFAULT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT workouts_pkey PRIMARY KEY (id),
    CONSTRAINT workouts_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT Business_owner_id_fkey FOREIGN KEY (Business_owner_id)
        REFERENCES public.business_owners (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.workouts
    OWNER to postgres;