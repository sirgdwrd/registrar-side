# File Overlap Analysis Report

This report identifies files that exist in multiple places across the project variants and need manual merge attention.

## Core Files (exist in all 3 variants)

These files need immediate attention as they represent core application structure:

- `App.jsx`
- `index.css`
- `main.jsx`
- `components/DarkModeProvider.jsx`
- `components/layout/dashboardLayout.jsx`
- `context/AuthContext.jsx`

## Common Components (overlapping between variants)

These shared components need careful merge consideration:

### Dashboard Components

- `components/common/dashboardHeader.jsx`
- `components/common/dashboardSidebar.jsx`
- `components/common/logoutConfirmation.jsx`
- `components/common/dashboard/status.jsx`
- `components/common/dashboard/welcome.jsx`

### Application Components

- `components/common/application/inbox/inbox.jsx`
- `components/common/application/screening/screening.jsx`

### UI Components

- `components/ui/logoutSlider.jsx`

### Page Components

All page components overlap and need merge review:

- `components/pages/applicationPage.jsx`
- `components/pages/dashboardPage.jsx`
- `components/pages/gradingPage.jsx`
- `components/pages/helpSupportPage.jsx`
- `components/pages/recordPage.jsx`
- `components/pages/reportsPage.jsx`
- `components/pages/studentPage.jsx`

## Unique Features by Variant

### Frontend 2 Unique Features

- Complete inbox workflow (`components/common/application/inbox/inboxLayout/*`)
- Review system (`components/common/application/review/*`)
- Status cards (`components/common/dashboard/statusCards/*`)
- Data context (`contextData/dataContext.jsx`)

### Frontend 3 Unique Features

- Records management
  - `components/common/records/archivesearch.jsx`
  - `components/common/records/deactivatedrecords.jsx`
  - `components/common/records/ProcessExitModal.jsx`
  - `components/common/records/studentexitprocessing.jsx`
  - `components/common/records/transfercredentials.jsx`
- Reports system
  - `components/common/reports/academicReports.jsx`
  - `components/common/reports/enrollmentReports.jsx`
  - `components/common/reports/financialReports.jsx`
  - `components/common/reports/overviewDashboard.jsx`

### Main Frontend Unique Features

- Extensive grading system (`components/common/grading-academics/*`)
- Student management system (`components/common/student-management/*`)
- Enhanced UI components (`components/ui/*`)

## Recommended Merge Order

1. Core Structure (High Priority)

   - First merge: Authentication context and core app structure
   - `App.jsx`, `AuthContext.jsx`, `DarkModeProvider.jsx`
   - Layout components

2. Common Components (Medium Priority)

   - Dashboard structure (header, sidebar, base components)
   - Shared UI components
   - Page component shells

3. Feature Integration (Lower Priority)

   - Records management system from Frontend 3
   - Inbox workflow from Frontend 2
   - Reports system from Frontend 3
   - Status cards from Frontend 2

4. Final Integration
   - Unique features from each variant
   - Asset consolidation
   - Style reconciliation

## Notes

- Many components have similar names but potentially different implementations
- Asset files (in assets/img/) often overlap but may have different content
- Consider using VS Code's built-in diff viewer to compare implementations
- Test each merge in isolation before committing

## Next Steps

1. Start with core files: compare and merge `App.jsx`, `AuthContext.jsx`
2. Review layout components next as they affect the entire application
3. Create a consolidated component library from the best implementations
4. Test thoroughly after each major component merge

Would you like me to:

1. Show detailed diffs for any of these overlapping files
2. Start merging the core files in the recommended order
3. Generate a more detailed analysis of any specific component group
