-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_admin BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Business Partners table
CREATE TABLE business_partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR(255) NOT NULL,
    website_url VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    subscription_tier INTEGER NOT NULL, -- 1: 50 products, 2: 100 products, etc.
    monthly_fee DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, active, suspended
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product Prices table (for tracking prices across different platforms)
CREATE TABLE product_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    platform VARCHAR(100) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2),
    discount_percentage DECIMAL(5,2),
    currency VARCHAR(3) DEFAULT 'USD',
    url VARCHAR(255) NOT NULL,
    last_checked TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Price History table
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id),
    platform VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Price Alerts table
CREATE TABLE price_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    target_price DECIMAL(10,2) NOT NULL,
    min_discount_percentage DECIMAL(5,2),
    frequency VARCHAR(50) DEFAULT 'immediate', -- immediate, daily, weekly
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_triggered TIMESTAMP WITH TIME ZONE
);

-- User Wishlists table
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Ad Performance table
CREATE TABLE ad_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ad_platform VARCHAR(50) NOT NULL, -- google, medianet, amazon
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    revenue DECIMAL(10,2) DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Revenue Stats table
CREATE TABLE revenue_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    period VARCHAR(50) NOT NULL, -- daily, weekly, monthly, yearly
    ad_revenue DECIMAL(10,2) DEFAULT 0,
    subscription_revenue DECIMAL(10,2) DEFAULT 0,
    total_revenue DECIMAL(10,2) DEFAULT 0,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_product_prices_platform ON product_prices(platform);
CREATE INDEX idx_price_history_product_id ON price_history(product_id);
CREATE INDEX idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_partners_modtime
    BEFORE UPDATE ON business_partners
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_modtime
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();