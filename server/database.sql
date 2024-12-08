-- users table
create table users(
    user_id serial primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at date default current_date,
    first_name varchar(50),
    last_name varchar(50),
    interests text,
    profilephoto text
);

CREATE TABLE upload_items (
    id SERIAL PRIMARY KEY, -- Unique ID for each entry
    name VARCHAR(255) NOT NULL, -- Name of the product/service
    price NUMERIC(10, 2) NOT NULL, -- Price of the product/service
    description TEXT NOT NULL, -- Description of the product/service
    contact VARCHAR(255) NOT NULL, -- Contact information
    category VARCHAR(50) NOT NULL, -- Product or service category
    condition VARCHAR(50) NOT NULL, -- Condition (new, used, refurbished)
    pickup_details VARCHAR(255), -- Pickup details (optional)
    date_added DATE NOT NULL DEFAULT CURRENT_DATE, -- Date added
    images TEXT[] -- Array of image URLs or file paths
);
