import { defineConfig } from 'sanity'
import { deskTool } from "sanity/desk";
import { handleSchemaTypes } from './config/types';
import { handleStructure } from "./config/structure";
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'GotPop Portfolio',
  projectId: 'vgmuq0y3',
  dataset: 'production',
  plugins: [
    deskTool({
      structure: (S, context) => handleStructure(S, context)
    }), visionTool()
  ],
  schema: {
    types: (previousTypes) => handleSchemaTypes(previousTypes)
  }
})
