-- Table: public.nutrition_assignments

-- DROP TABLE public.nutrition_assignments;

CREATE TABLE public.nutrition_assignments
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    Business_owner_id uuid NOT NULL,
    nutrition_id uuid NOT NULL,
	user_id uuid NOT NULL,	
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT nutrition_assignments_pkey PRIMARY KEY (id),
    CONSTRAINT Business_owner_id_fkey FOREIGN KEY (Business_owner_id)
        REFERENCES public.business_owners (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.nutrition_assignments
    OWNER to postgres;