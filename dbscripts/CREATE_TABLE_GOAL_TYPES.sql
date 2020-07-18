-- Table: lookup.goal_types

-- DROP TABLE lookup.goal_types;

CREATE TABLE lookup.goal_types
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    type citext,    
	description citext,	
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT activities_pkey PRIMARY KEY (id)    
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE lookup.goal_types
    OWNER to postgres;