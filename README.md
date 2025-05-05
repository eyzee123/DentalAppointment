**1. System Architecture**
  **1.1 Overview**
  -The application follows a modular client-server architecture:
  - **Frontend**: Developed using React framework with redux for state management.
  - **Backend**: Powered by Node.js with Express.
  - **Database**: PostgreSQL hosted on AWS RDS.
  - **Deployment**: AWS Services with Kubernetes
    - ECR - Elastic Container Registry
    - EC2
    - RDS
  
**1.2 Architecture Diagram**

    Browser -> Frontend (React Framework) -> API Routes / External Backend (Node.js / Express) -> PostgreSQL

**2.Components**

  **2.1 Frontend**
  
    - Pages: /login, /signup, /home, /dashboard, /booking, /profile
    - Components: forms(signupForm),shared(e.g. buttons,dialog), Navbar
    - State Management: Redux with toolkit
    - Service: api,booking,auth,user
    - Utils: helper functions
    - Routes: Protected,Public
    - Global Assets: images, colors, typography 

  **2.2 Backend**
      - Modules: auth, user, booking, dentist, timeslot
      - Routes: GET, POST, PUT, PATCH
      - Controller: 
      - Service: 
      - Repository:

**3. Database Schema**

    CREATE TABLE IF NOT EXISTS public.appointments
    (
        id serial NOT NULL,
        patient_id integer,
        dentist_id integer,
        status character varying(20) COLLATE pg_catalog."default" DEFAULT 'booked'::character varying,
        created_at timestamp without time zone DEFAULT now(),
        timeslot_id integer,
        CONSTRAINT appointments_pkey PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS public.dentist_slots
    (
        id serial NOT NULL,
        dentist_id integer,
        slot_time time without time zone NOT NULL,
        appointment_date date NOT NULL,
        created_at timestamp without time zone DEFAULT now(),
        CONSTRAINT dentist_slots_pkey PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS public.dentists
    (
        id serial NOT NULL,
        name character varying(100) COLLATE pg_catalog."default",
        specialization character varying(100) COLLATE pg_catalog."default",
        created_at timestamp without time zone DEFAULT now(),
        updated_at timestamp without time zone DEFAULT now(),
        CONSTRAINT dentists_pkey PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS public.users
    (
        id serial NOT NULL,
        name character varying(100) COLLATE pg_catalog."default",
        email character varying(100) COLLATE pg_catalog."default" NOT NULL,
        password_hash text COLLATE pg_catalog."default" NOT NULL,
        phone_number character varying(20) COLLATE pg_catalog."default",
        created_at timestamp without time zone DEFAULT now(),
        updated_at timestamp without time zone DEFAULT now(),
        CONSTRAINT users_pkey PRIMARY KEY (id),
        CONSTRAINT users_email_key UNIQUE (email)
    );
    
    ALTER TABLE IF EXISTS public.appointments
        ADD CONSTRAINT appointments_dentist_id_fkey FOREIGN KEY (dentist_id)
        REFERENCES public.dentists (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE;
    
    
    ALTER TABLE IF EXISTS public.appointments
        ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE;
    
    
    ALTER TABLE IF EXISTS public.appointments
        ADD CONSTRAINT appointments_timeslot_id_fkey FOREIGN KEY (timeslot_id)
        REFERENCES public.dentist_slots (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;
    
    
    ALTER TABLE IF EXISTS public.dentist_slots
        ADD CONSTRAINT dentist_slots_dentist_id_fkey FOREIGN KEY (dentist_id)
        REFERENCES public.dentists (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE;

**5. Deployment**
 - Kubernetes: setup, configuration. Handling of secrets, config maps.
 - Database: AWS RDS

**5. Assumptions**
 - Dental Clinic Name will be static
 - Dentist,Schedules(Time Slot,date) will be manually added
 - Services is just for display/information, not necessary in booking
