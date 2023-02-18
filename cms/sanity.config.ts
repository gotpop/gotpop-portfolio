import { defineConfig } from 'sanity'
import { deskTool } from "sanity/desk";
import { handleStructure } from "./config/structure";
import { schemaTypes } from './schemas';
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
    types: schemaTypes
  }
})
