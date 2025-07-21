#!/bin/bash

# Performance Optimization Build Script
echo "🚀 Building optimized version..."

# Create optimized directory
mkdir -p dist

# Copy optimized files
cp index-optimized.html dist/index.html
cp style.css dist/
cp script.js dist/
cp sw.js dist/
cp critical.css dist/

echo "✅ Optimized files copied to dist/"

# Optional: Minify CSS and JS (requires external tools)
if command -v npx &> /dev/null; then
    echo "🔧 Minifying files..."
    
    # Install dependencies if package.json exists
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Minify CSS
    if command -v cleancss &> /dev/null; then
        cleancss -o dist/style.min.css dist/style.css
        echo "✅ CSS minified"
    fi
    
    # Minify JS
    if command -v terser &> /dev/null; then
        terser dist/script.js -o dist/script.min.js -c -m
        echo "✅ JS minified"
    fi
fi

# File size analysis
echo "📊 File size analysis:"
echo "Original files:"
ls -lh index.html style.css script.js | awk '{print $9 "\t" $5}'

echo -e "\nOptimized files:"
ls -lh dist/ | awk '{print $9 "\t" $5}' | tail -n +2

# Calculate total savings
ORIGINAL_SIZE=$(du -bc index.html style.css script.js | tail -1 | cut -f1)
OPTIMIZED_SIZE=$(du -bc dist/* | tail -1 | cut -f1)
SAVINGS=$((ORIGINAL_SIZE - OPTIMIZED_SIZE))
PERCENT_SAVINGS=$((SAVINGS * 100 / ORIGINAL_SIZE))

echo -e "\n💾 Bundle size reduction: ${SAVINGS} bytes (${PERCENT_SAVINGS}% smaller)"
echo "🏁 Build complete! Deploy the 'dist' folder for optimal performance."