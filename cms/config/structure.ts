import { CodeBlockIcon, CogIcon, ComponentIcon } from '@sanity/icons'
import { StructureBuilder, StructureResolverContext } from "sanity/desk"

import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"

export const handleStructure = (S: StructureBuilder, context: StructureResolverContext) => {
    return S.list()
        .title("GotPop Content Manager")
        .items([
            S.listItem()
                .title("Site Config")
                .icon(CogIcon)
                .child(
                    S.editor().schemaType("siteconfig").documentId("siteconfig")
                ),
            S.divider(),
            orderableDocumentListDeskItem({ 
                icon: CodeBlockIcon,
                type: 'category', 
                title: 'Skills',
                S, 
                context
            }),
            orderableDocumentListDeskItem({
                icon: ComponentIcon,
                type: 'project',
                title: 'Projects',
                S,
                context
            }),
        ])
}