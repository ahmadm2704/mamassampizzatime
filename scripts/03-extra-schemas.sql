CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT '"'uuid_generate_v4()'"',
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS careers (
    id UUID PRIMARY KEY DEFAULT '"'uuid_generate_v4()'"',
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
