
-- Table: lookup.activity_type

-- DROP TABLE lookup.activity_type

CREATE TABLE lookup.activity_type
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    type citext,
    description citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true,	
    CONSTRAINT activity_type_pkey PRIMARY KEY (id)    
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE lookup.activity_type
    OWNER to postgres;