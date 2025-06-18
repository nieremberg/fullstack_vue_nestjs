#!/bin/bash

# 🚀 Fullstack App Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Fullstack Vue + NestJS Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."

    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ and try again."
        exit 1
    fi

    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version must be 18 or higher. Current version: $(node --version)"
        exit 1
    fi

    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed."
        exit 1
    fi

    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Some features may not work."
    fi

    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_warning "Docker Compose is not installed. Some features may not work."
    fi

    print_success "All requirements check passed!"
}

# Setup environment variables
setup_env() {
    print_status "Setting up environment variables..."

    if [ ! -f .env ]; then
        cp .env.example .env
        print_success "Created .env file from .env.example"
        print_warning "Please review and update the .env file with your specific configuration"
    else
        print_warning ".env file already exists, skipping..."
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."

    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install

    # Install frontend dependencies
    print_status "Installing frontend dependencies..."
    cd frontend && npm install && cd ..

    # Install backend dependencies
    print_status "Installing backend dependencies..."
    cd backend && npm install && cd ..

    print_success "All dependencies installed!"
}

# Setup database
setup_database() {
    print_status "Setting up database..."

    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        print_status "Starting database with Docker..."
        docker-compose up -d postgres

        # Wait for database to be ready
        print_status "Waiting for database to be ready..."
        sleep 10

        # Run migrations
        print_status "Running database migrations..."
        cd backend && npx prisma migrate dev --name init && cd ..

        # Seed database
        print_status "Seeding database..."
        cd backend && npx prisma db seed && cd ..

        print_success "Database setup completed!"
    else
        print_warning "Docker not available. Please set up PostgreSQL manually and run:"
        print_warning "  cd backend && npx prisma migrate dev --name init"
        print_warning "  cd backend && npx prisma db seed"
    fi
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."

    if [ -d .git ]; then
        npx husky install
        print_success "Git hooks installed!"
    else
        print_warning "Not a git repository. Skipping Git hooks setup."
    fi
}

# Main setup function
main() {
    echo "======================================="
    echo "🚀 Fullstack App Setup"
    echo "======================================="

    check_requirements
    setup_env
    install_dependencies
    setup_database
    setup_git_hooks

    echo "======================================="
    print_success "Setup completed successfully! 🎉"
    echo "======================================="
    echo ""
    echo "Next steps:"
    echo "1. Review and update the .env file"
    echo "2. Start the development server:"
    echo "   npm run dev"
    echo ""
    echo "Available URLs:"
    echo "- Frontend: http://localhost:3000"
    echo "- Backend API: http://localhost:3001"
    echo "- API Documentation: http://localhost:3001/api"
    echo "- Storybook: http://localhost:6006"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"
