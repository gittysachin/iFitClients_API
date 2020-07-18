-- Table: public.goals

-- DROP TABLE public.goals;

CREATE TABLE public.goals
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,    
	goal_type_id uuid NOT NULL,	
	goal_value decimal,
	Rewards_on_completion citext,
	Punishment_on_failing citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT goals_pkey PRIMARY KEY (id),
	CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT goal_type_id_fkey FOREIGN KEY (goal_type_id)
        REFERENCES lookup.goal_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION	
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.goals
    OWNER to postgres;