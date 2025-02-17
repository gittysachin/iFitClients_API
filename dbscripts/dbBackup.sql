PGDMP     !                    x            ifitclients    11.5    11.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    35818    ifitclients    DATABASE     �   CREATE DATABASE ifitclients WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_India.1252' LC_CTYPE = 'English_India.1252';
    DROP DATABASE ifitclients;
             postgres    false            	            2615    35819    lookup    SCHEMA        CREATE SCHEMA lookup;
    DROP SCHEMA lookup;
             postgres    false                        3079    35866    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                  false            �           0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                       false    2                        3079    35823    pgcrypto 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
    DROP EXTENSION pgcrypto;
                  false            �           0    0    EXTENSION pgcrypto    COMMENT     <   COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
                       false    3            �            1259    36001    business_owners    TABLE     I  CREATE TABLE public.business_owners (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    business_name public.citext,
    business_logo_url public.citext,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone
);
 #   DROP TABLE public.business_owners;
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
       public         postgres    false    3    2    2    2    2    2            �            1259    35972 	   locations    TABLE     <  CREATE TABLE public.locations (
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
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �            1259    35860 	   user_type    TABLE     �   CREATE TABLE public.user_type (
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
    location_id uuid NOT NULL,
    last_login_date timestamp with time zone,
    facility_code public.citext,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.users;
       public         postgres    false    3    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2            �          0    36001    business_owners 
   TABLE DATA               |   COPY public.business_owners (id, business_name, business_logo_url, user_id, created_at, updated_at, deleted_at) FROM stdin;
    public       postgres    false    202   u'       �          0    36036    client_measurements 
   TABLE DATA               �   COPY public.client_measurements (id, user_id, measurement_date, weight, height, body_fat_percentage, waist, hips, thighs, chest, neck, upper_arms, fore_arms, calves, dob, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
    public       postgres    false    203   �'       �          0    35972 	   locations 
   TABLE DATA               h   COPY public.locations (id, name, type, address1, address2, city, state, zipcode, lat, long) FROM stdin;
    public       postgres    false    200   �'       �          0    35860 	   user_type 
   TABLE DATA               :   COPY public.user_type (id, type, description) FROM stdin;
    public       postgres    false    199   (       �          0    35981    users 
   TABLE DATA               �   COPY public.users (id, user_type_id, first_name, last_name, avatar_uri, phone, email, salutation, credentials, dob, about, sex, location_id, last_login_date, facility_code, created_at, updated_at, deleted_at, is_deleted) FROM stdin;
    public       postgres    false    201   �(       ,           2606    36010 $   business_owners business_owners_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.business_owners
    ADD CONSTRAINT business_owners_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.business_owners DROP CONSTRAINT business_owners_pkey;
       public         postgres    false    202            .           2606    36057 ,   client_measurements client_measurements_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.client_measurements
    ADD CONSTRAINT client_measurements_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.client_measurements DROP CONSTRAINT client_measurements_pkey;
       public         postgres    false    203            (           2606    35980    locations locations_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.locations DROP CONSTRAINT locations_pkey;
       public         postgres    false    200            &           2606    35865    user_type user_type_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.user_type
    ADD CONSTRAINT user_type_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.user_type DROP CONSTRAINT user_type_pkey;
       public         postgres    false    199            *           2606    35990    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         postgres    false    201            1           2606    36011    business_owners users_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.business_owners
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_type(id);
 G   ALTER TABLE ONLY public.business_owners DROP CONSTRAINT users_id_fkey;
       public       postgres    false    202    2854    199            2           2606    36058 !   client_measurements users_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.client_measurements
    ADD CONSTRAINT users_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 K   ALTER TABLE ONLY public.client_measurements DROP CONSTRAINT users_id_fkey;
       public       postgres    false    201    203    2858            0           2606    36063    users users_location_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id);
 F   ALTER TABLE ONLY public.users DROP CONSTRAINT users_location_id_fkey;
       public       postgres    false    201    200    2856            /           2606    35991    users users_user_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.user_type(id);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT users_user_type_id_fkey;
       public       postgres    false    2854    201    199            �      x������ � �      �      x������ � �      �   O   x�K3JMIL��ԵL1��51JN�ML14�57OL65M4LL�0�LLI)J-.����M��"�Ĝ̴����D�W� �      �   �   x�-̱n1 �9�/F��\�t��#����I����؟g�A� 30��dl�:y��t�?�ݏ�����n�ż�qq�܇BϘaFE���k�m�[�"�F�B�#*X�<K7Y��c����٫i/:d<D@�2��ؚ�Z֜�7�o~;-����5�      �   �   x�E�1
�0E��݋�,ٱ�)�{O�E�d(4-��CSH)��}���+��Dk�����ȊQ�tݕk�b� �( �Z�������*�G�܎�N��v�ھ�eU�q�K��Dj�jX��69��$A��C%$!��)��<�J���ib��e����@7     