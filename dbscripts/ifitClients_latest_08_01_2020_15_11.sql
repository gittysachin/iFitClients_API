PGDMP     *                    x            ifitclients    11.5    11.5 L    9           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            :           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            ;           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            <           1262    35818    ifitclients    DATABASE     �   CREATE DATABASE ifitclients WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE ifitclients;
             postgres    false            	            2615    35819    lookup    SCHEMA        CREATE SCHEMA lookup;
    DROP SCHEMA lookup;
             postgres    false                        3079    35866    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                  false            =           0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                       false    2                        3079    35823    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                  false            >           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                       false    3            �            1259    52336    activity_type    TABLE     A  CREATE TABLE lookup.activity_type (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type public.citext,
    description public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
 !   DROP TABLE lookup.activity_type;
       lookup         postgres    false    3    2    2    2    2    2    9    2    2    2    2    2            �            1259    52376 
   goal_types    TABLE     >  CREATE TABLE lookup.goal_types (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type public.citext,
    description public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE lookup.goal_types;
       lookup         postgres    false    3    9    2    2    2    2    2    2    2    2    2    2            �            1259    52353 
   activities    TABLE     k  CREATE TABLE public.activities (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_owner_id uuid NOT NULL,
    user_id uuid NOT NULL,
    activity_type_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.activities;
       public         postgres    false    3            �            1259    36001    business_owners    TABLE     �  CREATE TABLE public.business_owners (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_name public.citext,
    business_logo_url public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    location_id uuid,
    facility_code public.citext,
    is_active boolean DEFAULT true
);
 #   DROP TABLE public.business_owners;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    44033 
   categories    TABLE     S  CREATE TABLE public.categories (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name public.citext,
    type public.citext,
    business_owner_id uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.categories;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2            �            1259    36036    client_measurements    TABLE     �  CREATE TABLE public.client_measurements (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    measurement_date timestamp with time zone,
    weight numeric DEFAULT 0,
    height numeric DEFAULT 0,
    body_fat_percentage numeric DEFAULT 0,
    waist numeric DEFAULT 0,
    hips numeric DEFAULT 0,
    thighs numeric DEFAULT 0,
    chest numeric DEFAULT 0,
    neck numeric DEFAULT 0,
    upper_arms numeric DEFAULT 0,
    fore_arms numeric DEFAULT 0,
    calves numeric DEFAULT 0,
    dob public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_deleted boolean DEFAULT false
);
 '   DROP TABLE public.client_measurements;
       public         postgres    false    3    2    2    2    2    2            �            1259    52444    compare_snaps    TABLE     f  CREATE TABLE public.compare_snaps (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    before_snapid uuid NOT NULL,
    after_snapid uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
 !   DROP TABLE public.compare_snaps;
       public         postgres    false    3            �            1259    52396    goals    TABLE     �  CREATE TABLE public.goals (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    goal_type_id uuid NOT NULL,
    goal_value numeric,
    rewards_on_completion public.citext,
    punishment_on_failing public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.goals;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2            �            1259    35972 	   locations    TABLE     <  CREATE TABLE public.locations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name public.citext,
    type public.citext,
    address1 public.citext,
    address2 public.citext,
    city public.citext,
    state public.citext,
    zipcode public.citext,
    lat public.citext,
    long public.citext
);
    DROP TABLE public.locations;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    52274    nutrition_assignments    TABLE     r  CREATE TABLE public.nutrition_assignments (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_owner_id uuid NOT NULL,
    nutrition_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
 )   DROP TABLE public.nutrition_assignments;
       public         postgres    false    3            �            1259    52247 
   nutritions    TABLE     �  CREATE TABLE public.nutritions (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_owner_id uuid NOT NULL,
    category_id uuid NOT NULL,
    name public.citext,
    url public.citext,
    description public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.nutritions;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    52427 	   snapshots    TABLE     �  CREATE TABLE public.snapshots (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    snapshot_date timestamp with time zone DEFAULT now(),
    url public.citext,
    pose public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.snapshots;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2            �            1259    35860 	   user_type    TABLE     �   CREATE TABLE public.user_type (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    type public.citext,
    description public.citext
);
    DROP TABLE public.user_type;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2            �            1259    35981    users    TABLE     �  CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_type_id uuid NOT NULL,
    first_name public.citext,
    last_name public.citext,
    avatar_uri public.citext,
    phone public.citext,
    email public.citext,
    salutation public.citext,
    credentials public.citext,
    dob public.citext,
    about public.citext,
    sex public.citext,
    location_id uuid,
    last_login_date timestamp with time zone,
    facility_code public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_deleted boolean DEFAULT false,
    bownerid uuid
);
    DROP TABLE public.users;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    52313    workout_assignments    TABLE     n  CREATE TABLE public.workout_assignments (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_owner_id uuid NOT NULL,
    workout_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
 '   DROP TABLE public.workout_assignments;
       public         postgres    false    3            �            1259    52292    workouts    TABLE     �  CREATE TABLE public.workouts (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_owner_id uuid NOT NULL,
    category_id uuid NOT NULL,
    url public.citext,
    name public.citext,
    description public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_active boolean DEFAULT true
);
    DROP TABLE public.workouts;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            1          0    52336    activity_type 
   TABLE DATA               m   COPY lookup.activity_type (id, type, description, created_at, updated_at, deleted_at, is_active) FROM stdin;
    lookup       postgres    false    209   Yq       3          0    52376 
   goal_types 
   TABLE DATA               j   COPY lookup.goal_types (id, type, description, created_at, updated_at, deleted_at, is_active) FROM stdin;
    lookup       postgres    false    211   r       2          0    52353 
   activities 
   TABLE DATA               �   COPY public.activities (id, business_owner_id, user_id, activity_type_id, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    210   �r       *          0    36001    business_owners 
   TABLE DATA               �   COPY public.business_owners (id, business_name, business_logo_url, created_at, updated_at, deleted_at, location_id, facility_code, is_active) FROM stdin;
    public       postgres    false    202   �r       ,          0    44033 
   categories 
   TABLE DATA               v   COPY public.categories (id, name, type, business_owner_id, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    204   Nt       +          0    36036    client_measurements 
   TABLE DATA               �   COPY public.client_measurements (id, user_id, measurement_date, weight, height, body_fat_percentage, waist, hips, thighs, chest, neck, upper_arms, fore_arms, calves, dob, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
    public       postgres    false    203   u       6          0    52444    compare_snaps 
   TABLE DATA               �   COPY public.compare_snaps (id, user_id, before_snapid, after_snapid, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    214   �u       4          0    52396    goals 
   TABLE DATA               �   COPY public.goals (id, user_id, goal_type_id, goal_value, rewards_on_completion, punishment_on_failing, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    212   �v       (          0    35972 	   locations 
   TABLE DATA               h   COPY public.locations (id, name, type, address1, address2, city, state, zipcode, lat, long) FROM stdin;
    public       postgres    false    200   ew       .          0    52274    nutrition_assignments 
   TABLE DATA               �   COPY public.nutrition_assignments (id, business_owner_id, nutrition_id, user_id, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    206   �}       -          0    52247 
   nutritions 
   TABLE DATA               �   COPY public.nutritions (id, business_owner_id, category_id, name, url, description, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    205   L~       5          0    52427 	   snapshots 
   TABLE DATA               y   COPY public.snapshots (id, user_id, snapshot_date, url, pose, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    213    �       '          0    35860 	   user_type 
   TABLE DATA               :   COPY public.user_type (id, type, description) FROM stdin;
    public       postgres    false    199   ��       )          0    35981    users 
   TABLE DATA               �   COPY public.users (id, user_type_id, first_name, last_name, avatar_uri, phone, email, salutation, credentials, dob, about, sex, location_id, last_login_date, facility_code, created_at, updated_at, deleted_at, is_deleted, bownerid) FROM stdin;
    public       postgres    false    201   ��       0          0    52313    workout_assignments 
   TABLE DATA               �   COPY public.workout_assignments (id, business_owner_id, workout_id, user_id, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    208   U�       /          0    52292    workouts 
   TABLE DATA               �   COPY public.workouts (id, business_owner_id, category_id, url, name, description, created_at, updated_at, deleted_at, is_active) FROM stdin;
    public       postgres    false    207   U�       �           2606    52386    goal_types activities_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY lookup.goal_types
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY lookup.goal_types DROP CONSTRAINT activities_pkey;
       lookup         postgres    false    211            �           2606    52346     activity_type activity_type_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY lookup.activity_type
    ADD CONSTRAINT activity_type_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY lookup.activity_type DROP CONSTRAINT activity_type_pkey;
       lookup         postgres    false    209            �           2606    52360    activities activities_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.activities DROP CONSTRAINT activities_pkey;
       public         postgres    false    210            �           2606    36010 $   business_owners business_owners_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.business_owners
    ADD CONSTRAINT business_owners_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.business_owners DROP CONSTRAINT business_owners_pkey;
       public         postgres    false    202            �           2606    44043    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public         postgres    false    204            �           2606    36057 ,   client_measurements client_measurements_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.client_measurements
    ADD CONSTRAINT client_measurements_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.client_measurements DROP CONSTRAINT client_measurements_pkey;
       public         postgres    false    203            �           2606    52451     compare_snaps compare_snaps_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.compare_snaps
    ADD CONSTRAINT compare_snaps_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.compare_snaps DROP CONSTRAINT compare_snaps_pkey;
       public         postgres    false    214            �           2606    52406    goals goals_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.goals DROP CONSTRAINT goals_pkey;
       public         postgres    false    212            ~           2606    35980    locations locations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public         postgres    false    200            �           2606    52281 0   nutrition_assignments nutrition_assignments_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.nutrition_assignments
    ADD CONSTRAINT nutrition_assignments_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.nutrition_assignments DROP CONSTRAINT nutrition_assignments_pkey;
       public         postgres    false    206            �           2606    52257    nutritions nutritions_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.nutritions
    ADD CONSTRAINT nutritions_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.nutritions DROP CONSTRAINT nutritions_pkey;
       public         postgres    false    205            �           2606    52438    snapshots snapshots_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.snapshots
    ADD CONSTRAINT snapshots_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.snapshots DROP CONSTRAINT snapshots_pkey;
       public         postgres    false    213            |           2606    35865    user_type user_type_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_type DROP CONSTRAINT user_type_pkey;
       public         postgres    false    199            �           2606    35990    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    201            �           2606    52320 ,   workout_assignments workout_assignments_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.workout_assignments
    ADD CONSTRAINT workout_assignments_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.workout_assignments DROP CONSTRAINT workout_assignments_pkey;
       public         postgres    false    208            �           2606    52302    workouts workouts_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.workouts DROP CONSTRAINT workouts_pkey;
       public         postgres    false    207            �           2606    52366     activities activity_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activity_type_id_fkey FOREIGN KEY (activity_type_id) REFERENCES lookup.activity_type(id);
 J   ALTER TABLE ONLY public.activities DROP CONSTRAINT activity_type_id_fkey;
       public       postgres    false    209    210    2960            �           2606    52258 !   nutritions business_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nutritions
    ADD CONSTRAINT business_owner_id_fkey FOREIGN KEY (business_owner_id) REFERENCES public.business_owners(id);
 K   ALTER TABLE ONLY public.nutritions DROP CONSTRAINT business_owner_id_fkey;
       public       postgres    false    205    202    2946            �           2606    52282 ,   nutrition_assignments business_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nutrition_assignments
    ADD CONSTRAINT business_owner_id_fkey FOREIGN KEY (business_owner_id) REFERENCES public.business_owners(id);
 V   ALTER TABLE ONLY public.nutrition_assignments DROP CONSTRAINT business_owner_id_fkey;
       public       postgres    false    206    2946    202            �           2606    52308    workouts business_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT business_owner_id_fkey FOREIGN KEY (business_owner_id) REFERENCES public.business_owners(id);
 I   ALTER TABLE ONLY public.workouts DROP CONSTRAINT business_owner_id_fkey;
       public       postgres    false    2946    202    207            �           2606    52321 *   workout_assignments business_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workout_assignments
    ADD CONSTRAINT business_owner_id_fkey FOREIGN KEY (business_owner_id) REFERENCES public.business_owners(id);
 T   ALTER TABLE ONLY public.workout_assignments DROP CONSTRAINT business_owner_id_fkey;
       public       postgres    false    202    208    2946            �           2606    52361 !   activities business_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.activities
    ADD CONSTRAINT business_owner_id_fkey FOREIGN KEY (business_owner_id) REFERENCES public.business_owners(id);
 K   ALTER TABLE ONLY public.activities DROP CONSTRAINT business_owner_id_fkey;
       public       postgres    false    210    2946    202            �           2606    44013 ,   business_owners business_owner_location_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.business_owners
    ADD CONSTRAINT business_owner_location_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id);
 V   ALTER TABLE ONLY public.business_owners DROP CONSTRAINT business_owner_location_fkey;
       public       postgres    false    2942    200    202            �           2606    52263    nutritions category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nutritions
    ADD CONSTRAINT category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);
 E   ALTER TABLE ONLY public.nutritions DROP CONSTRAINT category_id_fkey;
       public       postgres    false    2950    204    205            �           2606    52412    goals goal_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goal_type_id_fkey FOREIGN KEY (goal_type_id) REFERENCES lookup.goal_types(id);
 A   ALTER TABLE ONLY public.goals DROP CONSTRAINT goal_type_id_fkey;
       public       postgres    false    2964    212    211            �           2606    52287 "   nutrition_assignments user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.nutrition_assignments
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 L   ALTER TABLE ONLY public.nutrition_assignments DROP CONSTRAINT user_id_fkey;
       public       postgres    false    206    201    2944            �           2606    52331     workout_assignments user_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.workout_assignments
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.workout_assignments DROP CONSTRAINT user_id_fkey;
       public       postgres    false    201    2944    208            �           2606    52371    activities user_id_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public.activities
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 A   ALTER TABLE ONLY public.activities DROP CONSTRAINT user_id_fkey;
       public       postgres    false    210    2944    201            �           2606    52407    goals user_id_fkey    FK CONSTRAINT     q   ALTER TABLE ONLY public.goals
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 <   ALTER TABLE ONLY public.goals DROP CONSTRAINT user_id_fkey;
       public       postgres    false    201    2944    212            �           2606    52439    snapshots user_id_fkey    FK CONSTRAINT     u   ALTER TABLE ONLY public.snapshots
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 @   ALTER TABLE ONLY public.snapshots DROP CONSTRAINT user_id_fkey;
       public       postgres    false    2944    201    213            �           2606    52452    compare_snaps user_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.compare_snaps
    ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.compare_snaps DROP CONSTRAINT user_id_fkey;
       public       postgres    false    214    2944    201            �           2606    36058 !   client_measurements users_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_measurements
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 K   ALTER TABLE ONLY public.client_measurements DROP CONSTRAINT users_id_fkey;
       public       postgres    false    2944    203    201            �           2606    35991    users users_user_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.user_type(id);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_type_id_fkey;
       public       postgres    false    2940    201    199            �           2606    52326 #   workout_assignments workout_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workout_assignments
    ADD CONSTRAINT workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workouts(id);
 M   ALTER TABLE ONLY public.workout_assignments DROP CONSTRAINT workout_id_fkey;
       public       postgres    false    2956    207    208            �           2606    52303 "   workouts workouts_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.workouts
    ADD CONSTRAINT workouts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);
 L   ALTER TABLE ONLY public.workouts DROP CONSTRAINT workouts_category_id_fkey;
       public       postgres    false    207    2950    204            1   �   x��αnB1��9�)�+#�q��n��[����& !����������Ӊyɐ$)H��5k��\��ã��}�}m�����+02*mHf��i[r!����k�T|P�2 �4��ָCY�s���0�z�G��/�[:�� �)X���Y��͖����ϻ���O�i�~�E�      3   �   x���1�0��=Ewd��nwd������4P��]�=0p�Jo����a�����0�w�23k$Smn�|lݲ�^�eե��G����v��#��w[��b�D�i��RX�����Ӥ�/\t~����H����~V�
Y6oҜ���κ���m�~ ��H�      2      x������ � �      *   O  x���KkA�ϳ�Bw��L?f��f�[�I�y�,Xk�w�ɿ�䨜}����0(HX�CR� �*"{�a2?�޽��0��v�y)i~_�m$k�p�8n�yIu=��ui��o�����m^N���s'ʖU���z9���z��s22����0�+=���Ej�Fu*�K��`���fW�Q�!�m�)9OC�=�s�S��^k�R�F5/���p<��8h�NDa�#r�8D�|��\�&�A@s�0ZI�L�!�t���I�8I�!����gL��2����}�ƨ�<a����(q�T���GK@�� e���y�5)PC˱KX����p��� ��      ,   �   x���=j�0�Z>��0f4�я���rO��H����k�믳E�t�)�{�U��rK�1 �Cet��lʨ���{~����k�\�o_��MU��5��\�!�B`��ȥ��!<��H4;�E&8������s���%QԳY���q��UIRh͓�轾0�c�����f�M�����	����xn�0O�KE      +   �   x��N�q1�qU(���#�"\��O�%�d+�{v7 f����},��6c�t�Qu���B��3P���=1/\sn�A:��#Ǎ�}�	A5(�` b����Ϗ�˽d���Mk#?+s����O����+&��)^�
�Ǌ�;�a5�S�q�{�e��l"M�b��g��<���K�      6   �   x�ő=j1���S�c��3�!r��x��	���!��=P'!>!�-C��ẗ́��`�׵�6:,m�K�FA���炱�����zm\0א�i%�Z��JH�x����ߘ;E)&D��Ѻ������TK�yss��0�
�%�֕M_o�x����;�؍
��L{�v���/��t��@ ��3⵻��RQj��G9��㴒�      4   �   x��;
�0 ��>E�� �?9s��!'�"��(����ƞ�$kY ����2�NCU�,�TB�J���N}��ެ����IV�V+�
C�s@e�L35Sq���cz-�-��0����� �Ba�|[���������.���;�,3      (   5  x��W�n�E<o�b�F=��Ǆp �\z~6Jl��x{j�m9���!k�,ٲ�f���k�ϡ*B2X(�n��*E{J�tԲ��4���c������ܽxz��J_��xq���=
-���)��WM�6r'�%�4x�"5�����s^�?�j�Ա�����b�E�_Ŕ���7���)FNT5r>�4M��v$+�|��r���}�U�Ek=�� u�-��(���&�\��e�,λ~&��\��I�F��FU2�N�k�&!m���tO�7 ��Q�jT��E3��F�{�������/�0����0J�O�g�����wg�~�o�� U�Q�I�NP�TS���"���kq��y_%��-�`VXz�ψ�t�,!Pj�G���$��st���_C����T��Ti-�5};��I��9K����*�K׀Z�8vB>��x��gb0%��$�u\�\��g?���-E烙��5�3�5A�	]���$�4	$	�aV���t�5Nq�==/���S�]������6���7/��W��*܌��<���8���Z
R��R`��`o^���vM��x����
ua�1W�WɶU��/���//��^]^wO�8�~y���Q߻����X�ic�\@w�&��A�v����������P�Yt�B�wO�b��1<���~qH3߀%X��Ml/�
���!F8Z;�؇�\����b�_�E͗�<N��<g'9��X&��n���D�L��r��\Lz�aX�и�6bW
�s����َ��c��3$�2 �,�Z�B���u����Uk6��Ze�	<ݲ����D���o��5�-q�5'�"��kJ5d8*������bOH]�.K�]�И�]x�jCܙ���� q�J�n� ۍbu������.�R�"&����^s�<)�>z��8�ե;R�c�d��1"�!�PJy&�ɫ�g3�1��Na�8�,���5���մ}�;�b�I)d$0Ye�N��<�0W��r����Gψ��k<������f-XB���A#�JTS�e0ƚRK[�q��*"�5E2�R� _u+jn�
R�H��!a�@H&�$�9-V�����X��P���w��i�j5,J����^V��{��5G'\����|h�T���3*�g�ڎ��QƔ$��|��U]`B$F�RA�o0��s�eӀ�H�;?���L��2R�6���s���#�N��ނ��Ε���A.�SӸ���ldЍL��ʹ�g8�����t��i=��A�G�"X�`#
��>�=���� /=�Q�	�'JGQpu�Hq��=6������^Ů!�D7V�B�����Ǧ���m�M�0�
�uAWk���.VjĻLV�_��u�\p<��L�\|0˼��2ل�F��$0�3G���%���h�7��:�˰f�ŏ�Zs]�x��5��g`hFs�r�T��,�sP(#"�@[~8x�X@��,my���_����O��0����#�{xނ�.
U�!�Js�����>lΊE��u$|o��CJ�'�3�k��p�F]6�=�n�G
T�a�{�uS�ŗ�=�Z�A[      .   �   x�͹�0@�Z�"}@��D�Cd7��	�?� �~ߗ�d���"r�4�{`Y���V0gc��f����� E���ak���	�iwa��J��n&A�H���8�;�M��D/�S��~��q���������먵� z�.      -   �  x���M��6���_�{WY�?4@Q�i�6ǹ�m����%�d��C�n`{�%��J�ˇ�dՊZ��Pj�dݶl�+��j�E[iڮ�ZWm=J���39�5
V5���e{U�V�暉�J&Mo����j-Սc+��,ho��6�\�Ŝ�9���Z��K��U'3�v����ӻ��~a��'��I����L'�;./�*l�Cz���'�����(4�����X����5��Z�'
.�$�%8�C�rl�	7pҌ`��,'(�cUBe}��D�o�5/N�T[�z,kƶa�`CWk��Q���?��w00�^[��F�_ꆷ������_��Ǥ}�rq�R��o����W�D:�H3!�pE Z���Ĵa�a��
CH3����=J���9�h��и����\HOx $�b	�gG�ܲf5K��T5����%L���[0/E�'��s�f]��v>��jڿ�}�I�]��.���(��%!��`|i*'��Q�.&�LHԛ�YI�!g�H�����A;�^��B�&���z&_�,᭩��%��J�5U���t���6t��h��^�Z���Q�DSU����?d�%oHon�;ME�x:���o�RR��ˮiU��e1�|[;�����k�:V�Q�R��Wo�>�_;�|�      5   �   x���1n�0Eg���%J��1'�"Kr��X���SХ(���$��t��M̠pL`�� "H�2���7\xb�=x��G)C�i,�i�����7RAa0�3N�#��\��~YS\�u�G��_���}[֘�aدq������b�bͳT������z�/�@�Y+��j8=���d�	3�5��H�#�R�B�=%�w5
ʅ�!�O11V��Sl���Dw�W/ZC׶�7
s{      '   �   x�=ͱj�0 ������[�ci,��ҎYd[��5��������4@
Q��Y��ʔ��i��g�g�A� 30��dl�:y���9���մ��" XFQlMt-kN������͛�Pk�}(�fT$�N*�����x�mY�Z�4N      )   �  x���Mo�F�����=Xi���'�����C/��~�
$ː���w(+�k�A�+-gg��̄E�&q>����W[
h���ih��R�:V�E�o�zS���v}=��6z����q���n�v����j��\��lvZo/.�n���Y���n�v賀��)-o�/�D��2C>㿻n_v����v��˲��Gݞc�8������n�@�K�E]K�9	����.B��$�jo�o8���y$Y��;���sL1>l�$����ȧM�W�ۙo����eT0X�V�Nk����i�'����BNJJ��W0S�)��j�6�WPB\��`Qf�|_݄��� ym��g��+���2.F�#�%�(�~$I�p$��L�HVU���d�e�L���*�5I)��|��PM59��a���ܨ�Vk\@J�A[L*�\�-R�n�S���qN}�U����Tގ�@��^�C���Z�=X�]ϑX�OdK��)�9O��^I�{��}���3/G�#��'V���ø0�&^�%�@i�D;xBg�b�L������qf��ﺿ�Zo�zh�7�
 �"B�#���y,����e�a�Sa�L+����iSq�7kV�����q�A$s��(��F0�D�o�4!O��b��ؗ�R%ǚ��W�W��fG�#��^m���JO�Rϖ���`Zׇ@f�^�G�D�ΨfQ�GW����K��kf�F���P�ֶs7bvt�@�Mx��ϜJ������#ɘ<u�ǿ���'��ֹv:��g+@��h�4b7�������`��:MƗ&�+�h�L�6x7�7�ͺ�6������0|��'���R#"{+���y��'n��V;��r��ͩM��{j�����K�s�v=f�&29�L�އ�xR��W).��Q��iR��J6��2Q|��byvv���q�      0   �   x��йmC1 ���)�4�[���EJdD���,x<r�bTM�.DƆ�*��lM��Uh��S�sB�E�Z�%sT�j�$n0��v@PG�9���<��.��<``�IDB� *��;+]�Ζ��E���$vW�n��v�~�������(A6ns`�f=�����k#3���
�#��V�ޔ-������8��:���z�l��,��>&�皐
�rH>��h�4��_���� A��d      /   i  x�Ŕ�n1�ד��r��x"�������FeQ	�r�����V��5x=��Q@�
� �4��?����9�	�B),Ti�a�bj-
��e��x)p���Z�����^�@�u�yF%�e���S��� Y��ì�$�y�;>^�V�MXą���㕉nr�|��y;>�u��P?��)�3D�uU/"��� ��C��I�!9�1��GDW&�:"��Iv7|~bǗ�s&��X�c��tBM$WNx��b֟�my�y�G[���~w��#�Yz���^��m��܁�N���&/8f�[aHrE�m�?�/7��z�Cvj_�?��TK���o?�����έ))h�F2��[��Z
#�u����a�X6W��x��]�<���U}�:����L|����D/r�!4�`R��t%����� �
 `s��h�j8\���/��nM�7���f7��I�"�g[%��T6a�Ξ���7?�}oѥ��A����VϚF�TЦ�-L�G!��=)+xA�"y�(	.tn�p)΄)J�����nE�xvP*B�4��M�L�"�h+.mkh\�Jc��~\T����7�Na��m�!Bz���%EA����]����Xo�2     