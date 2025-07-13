# Fields Functionality Documentation

## Overview
The Fields functionality in this application allows users to manage geographic field boundaries and their associated features. It consists of a state management layer (useFieldsHook) and a user interface component (Fields.page.tsx) that work together to provide CRUD operations for field management.

## Architecture Components

### 1. useFieldsHook.ts - State Management Layer

#### Purpose
A Zustand-based state management hook that handles all field-related data operations and API communications.

#### Key Features
- **State Management**: Maintains an array of fields in the application state
- **API Integration**: Communicates with the backend API at `/v1/field` endpoint
- **CRUD Operations**: Provides complete Create, Read, Update, Delete functionality

#### State Structure
```typescript
interface FieldsState {
  fields: IFieldSchema[];           // Array of all fields
  fetchFields: () => Promise<void>; // Fetch all fields
  getFieldDetails: (id: string) => Promise<IFieldSchema | undefined>; // Get single field
  createField: (field: ICreateFieldSchema) => Promise<IFieldSchema>;   // Create new field
  updateField: (id: string, field: IUpdateFieldSchema) => Promise<IFieldSchema>; // Update existing field
  deleteField: (id: string) => Promise<void>; // Delete field
}
```

#### API Operations
1. **Fetch Fields**: `GET /v1/field` - Retrieves all fields and updates state
2. **Get Field Details**: `GET /v1/field/{id}` - Retrieves a specific field
3. **Create Field**: `POST /v1/field` - Creates a new field with geometry data
4. **Update Field**: `PUT /v1/field/{id}` - Updates an existing field
5. **Delete Field**: `DELETE /v1/field/{id}` - Removes a field and updates state

#### Authentication
All API calls use `fetchWithAuth()` which handles authentication headers automatically.

### 2. Fields.page.tsx - User Interface Component

#### Purpose
The main UI component that provides a comprehensive interface for field management, including map visualization and form interactions.

#### Key Features
- **Multi-Mode Interface**: Supports different operational modes
- **Map Integration**: Uses MapCanvas for geographic visualization
- **Form Management**: Handles field creation and editing forms
- **Feature Management**: Supports editing of field features
- **Orthophoto Integration**: Loads and displays orthophoto imagery

#### Operating Modes
```typescript
enum FieldMode {
  LIST = 'list',                    // Default mode - shows field list
  CREATE = 'create',                // Creating new field
  EDIT_FIELD = 'edit_field',        // Editing field boundaries
  EDIT_FEATURES = 'edit_features',  // Editing field features
}
```

#### State Management
The component manages multiple pieces of state:
- `selectedField`: Currently selected field
- `editableFeatures`: Features being edited
- `fieldMode`: Current operational mode
- `drawnGeometry`: Geometry being drawn on map
- `isSidebarCollapsed`: UI state for sidebar
- `tasks`: Available orthophoto tasks
- `selectedJobId`: Selected orthophoto job

#### Core Workflows

##### 1. Field Selection Workflow
```
User selects field → handleFieldSelect() → 
  ├── Sets selectedField state
  ├── Fetches orthophoto tasks via fetchTasksByFilters()
  ├── Sets available tasks and latest job ID
  └── Updates map display
```

##### 2. Field Creation Workflow
```
User clicks "Create Field" → setFieldMode(CREATE) →
  ├── Shows FieldForm component
  ├── User draws polygon on map → handleDrawGeometry()
  ├── User fills form and submits → handleCreateField()
  ├── Validates geometry exists
  ├── Calls createField() from hook
  └── Resets state and refreshes field list
```

##### 3. Field Editing Workflow
```
User clicks "Edit Field" → handleEditField() →
  ├── Sets mode to EDIT_FIELD
  ├── Pre-loads existing geometry
  ├── Shows FieldForm with existing data
  ├── User modifies geometry/data
  ├── Submits → handleUpdateField()
  └── Updates field via API and resets state
```

##### 4. Feature Editing Workflow
```
User clicks "Edit Features" → handleEditFeatures() →
  ├── Sets mode to EDIT_FEATURES
  ├── Fetches features via useFeaturesHook
  ├── Shows FeaturePropertyForm
  ├── User modifies features on map
  ├── Saves → handleSaveFeatures()
  └── Batch updates features via API
```

## Component Integration

### Map Canvas Integration
The MapCanvas component receives:
- `fields`: All available fields for display
- `features`: Current features being edited
- `controlButtons`: UI controls based on current mode
- `drawnGeometry`: Current geometry being drawn
- `selectedJobId`: Orthophoto imagery to display

### Form Components
- **FieldForm**: Handles field metadata and boundary editing
- **FeaturePropertyForm**: Manages feature properties and attributes
- **FieldPicker**: Lists all fields with action buttons

### Data Flow
```
User Action → Component State Update → API Call (via hook) → 
State Update → UI Re-render → Map Update
```

## Key Features

### 1. Orthophoto Integration
- Fetches mapping tasks for selected fields
- Displays orthophoto imagery on map
- Filters tasks by mission type 'MAP' and 'COMPLETE' status

### 2. Geometry Management
- Supports polygon drawing for field boundaries
- Handles point and line features within fields
- Validates geometry before saving

### 3. Error Handling
- Comprehensive error handling with user feedback
- Session expiration detection and redirect
- Validation for required geometry data

### 4. UI/UX Features
- Collapsible sidebar for space optimization
- Mode-based UI changes
- Loading states and user feedback
- Responsive design considerations

## API Dependencies

### Backend Endpoints
- `/v1/field` - Field CRUD operations
- `/v1/task` - Orthophoto task fetching
- Feature endpoints (via useFeaturesHook)

### Authentication
- Uses `fetchWithAuth()` for all API calls
- Handles unauthorized responses with redirects

## Type Definitions
The system uses TypeScript interfaces:
- `IFieldSchema`: Complete field data structure
- `ICreateFieldSchema`: Data required for field creation
- `IUpdateFieldSchema`: Data for field updates
- `IFeatureSchema`: Feature data structure
- `FeatureCollection`: GeoJSON feature collection

## Error Handling Strategy
1. **API Errors**: Caught and displayed as toast notifications
2. **Authentication Errors**: Redirect to login page
3. **Validation Errors**: Prevent submission with user feedback
4. **Network Errors**: Graceful degradation with retry options

This architecture provides a robust, user-friendly system for managing geographic field data with real-time map visualization and comprehensive editing capabilities. 