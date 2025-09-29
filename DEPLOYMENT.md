# 🚀 CDN Deployment Guide

## Overview
This guide explains how to deploy the CKH Booking Engine to various CDN services with automated CI/CD.

## 🆓 Free CDN Options (Recommended)

### 1. jsDelivr + GitHub (100% Free)

**Advantages:**
- ✅ Completely free
- ✅ Automatic updates from GitHub releases
- ✅ Global CDN with excellent performance
- ✅ Built-in CDN statistics
- ✅ Version management support

**Setup Steps:**

1. **Create GitHub Release:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **URLs Available Immediately:**
   ```html
   <!-- Latest version -->
   <script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>
   
   <!-- Specific version -->
   <script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@v1.0.0/dist/ckh-booking-engine.umd.js"></script>
   ```

3. **Statistics:** https://www.jsdelivr.com/package/gh/cakramediadata2022/plugin_be_cdn

### 2. unpkg + NPM (Free)

**Setup Steps:**

1. **Publish to NPM:**
   ```bash
   npm publish
   ```

2. **URLs Available:**
   ```html
   <script src="https://unpkg.com/ckh-booking-engine@latest/dist/ckh-booking-engine.umd.js"></script>
   ```

## 💰 Cost Comparison

| Service | Cost | Bandwidth | Features |
|---------|------|-----------|----------|
| **jsDelivr** | **FREE** | Unlimited | Auto-updates, statistics, global CDN |
| **unpkg** | **FREE** | Unlimited | NPM integration, version management |
| **GitHub Pages** | **FREE** | 100GB/month | Custom domains, simple hosting |
| **AWS CloudFront** | $0.085/GB | Pay per use | Advanced caching, edge locations |
| **Cloudflare** | $0-20/month | Unlimited on paid | Security, analytics, custom domains |
| **Fastly** | $0.12/GB | Pay per use | Real-time analytics, instant purge |

## 🔄 CI/CD Setup

### Automated Release Workflow

The provided GitHub Actions workflow automatically:

1. **Triggers on tag push:**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

2. **Builds the project:**
   - Installs dependencies
   - Runs build process
   - Generates all distribution formats

3. **Creates GitHub Release:**
   - Attaches all build files
   - Generates release notes
   - Makes files available to jsDelivr

4. **Publishes to NPM:**
   - Publishes package to NPM registry
   - Makes available on unpkg CDN

### Manual Deployment Commands

```bash
# Build project
npm run build

# Create and push tag
git tag v1.0.1
git push origin v1.0.1

# Publish to NPM (optional)
npm publish
```

## 📊 Performance & Monitoring

### jsDelivr Statistics
- **Usage stats:** https://www.jsdelivr.com/package/gh/cakramediadata2022/plugin_be_cdn
- **Global CDN:** 750+ locations worldwide
- **Performance:** ~50ms average response time

### Monitoring Your CDN Usage

1. **GitHub Insights:** Monitor repository traffic and releases
2. **jsDelivr Stats:** Track CDN usage and performance
3. **NPM Stats:** Monitor package downloads (if published to NPM)

## 🔧 Version Management

### Recommended Versioning Strategy

```html
<!-- Production: Use specific versions -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@v1.0.0/dist/ckh-booking-engine.umd.js"></script>

<!-- Development: Use latest -->
<script src="https://cdn.jsdelivr.net/gh/cakramediadata2022/plugin_be_cdn@latest/dist/ckh-booking-engine.umd.js"></script>
```

### Semantic Versioning
- `v1.0.0` - Major version (breaking changes)
- `v1.1.0` - Minor version (new features)
- `v1.0.1` - Patch version (bug fixes)

## 🚀 Getting Started

1. **Choose your CDN** (jsDelivr recommended for free option)
2. **Set up CI/CD** using provided GitHub Actions
3. **Create your first release** with `git tag v1.0.0`
4. **Start using CDN URLs** in your projects
5. **Monitor usage** through CDN statistics

## 📝 Best Practices

1. **Use specific versions in production**
2. **Test new versions before updating**
3. **Monitor CDN performance and usage**
4. **Keep build files in your repository**
5. **Use semantic versioning for releases**
6. **Document breaking changes in releases**

## 🆘 Troubleshooting

### CDN Not Updating?
- jsDelivr: Up to 24 hours for cache refresh
- Solution: Use `@latest` or purge cache

### Version Not Found?
- Check if GitHub release was created successfully
- Verify files are included in the release
- Wait a few minutes for CDN propagation

### Performance Issues?
- Use specific versions instead of `@latest`
- Consider using multiple CDN providers
- Monitor performance through CDN statistics