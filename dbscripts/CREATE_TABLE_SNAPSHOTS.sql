-- Table: public.snapshots

-- DROP TABLE public.snapshots;

CREATE TABLE public.snapshots
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,    
	snapshot_date timestamp with time zone DEFAULT now(),
	url citext,	
	pose citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT snapshots_pkey PRIMARY KEY (id),
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.snapshots
    OWNER to postgres;