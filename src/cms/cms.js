import CMS from 'netlify-cms-app'
import PostPreview from "./preview-templates/PostPreview"

CMS.registerPreviewTemplate('blogTr', PostPreview)
CMS.registerPreviewTemplate('blogEn', PostPreview)
CMS.init();