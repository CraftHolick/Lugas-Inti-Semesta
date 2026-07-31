# Legacy Insight Import Report

## Summary
- **Number of legacy articles found**: 6
- **Articles ready for import**: 6
- **Duplicate slugs skipped**: 0 (Handled safely in the migration script using `ON CONFLICT` style `IF NOT EXISTS` logic).

## Type and Topic Mapping
Legacy labels were mapped directly to the new `article_types` table.
- `Mining Knowledge` ➔ `mining-knowledge`
- `Regulasi` ➔ `regulasi`
- `Artikel` ➔ `artikel`
- `Company Update` ➔ `company-update`

## Missing Fields for Manual Review
- **Topic / Category**: None of the legacy articles in `src/data/insights.ts` contained secondary topic/subcategory data. Therefore, the `category_id` has been set to `NULL` for all legacy articles. These should be reviewed and categorized in the CMS after the migration.
- **Author**: Assigned to the first available `admin` profile in the system.

## Generated Artifacts
- **Migration File**: `supabase/migrations/20260731010000_import_legacy_insights.sql`
- **Content Format**: All plain-text legacy content was successfully mapped to valid Tiptap JSON format.

## Verification Results
- **Dry-run result**: Passed (`Finished supabase db push` - dry run).
- **TypeScript result**: Passed (0 errors).
- **Build result**: Passed (Compiled successfully).
