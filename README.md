# Playwright Memory Usage Profiling

This repository contains two branches demonstrating memory usage differences between Playwright versions. The branches included are:

- `memory-uses-for-playwright-1.41` (Playwright 1.41)
- `memory-uses-for-playwright-1.42` (Playwright 1.42)

## Reproduction Steps

To reproduce and analyze memory usage differences between the Playwright versions, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone <repository-url>

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests**

   - For profiling with `pprof`:

     ```bash
     npm run profile-test src/test.spec.tsx
     ```

   - For normal execution:

     ```bash
     npm run test src/test.spec.tsx
     ```

## Analysis Instructions

The `npm run profile-test` script is designed to profile memory usage with `pprof`. After running the tests with this script, you can visualize the memory profiles as follows:

1. **Install Go and `pprof`**

   If you don’t have Go installed, use Homebrew to install it:

   ```bash
   brew install go
   ```

2. **Visualize Profiles**

   Start a local web server for profile visualization:

   ```bash
   go tool pprof -http=:8080 pprof-heap-<timestamp>.pb.gz
   ```

   Replace `<timestamp>` with the actual timestamp from the generated profile file.

3. **Compare Profiles**

   Compare the memory profiles between Playwright 1.41 and 1.42+ to observe differences in memory usage. These differences highlight the impact of the changes introduced in the newer version of Playwright.

4. **Reference**

   For more information on pprof, please refer to the pprof [documentation](https://github.com/google/pprof)

## Notes

- Ensure you have the necessary tools and environment set up before running the profiling commands.
---

Feel free to reach out if you have any questions or issues related to profiling and analysis.
