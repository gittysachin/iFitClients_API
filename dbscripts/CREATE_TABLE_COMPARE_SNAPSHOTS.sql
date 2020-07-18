-- Table: public.compare_snaps

-- DROP TABLE public.compare_snaps;

CREATE TABLE public.compare_snaps
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,    
	before_snapid uuid NOT NULL,
	after_snapid uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT compare_snaps_pkey PRIMARY KEY (id),
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.compare_snaps
    OWNER to postgres;