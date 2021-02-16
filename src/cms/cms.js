import CMS from 'netlify-cms-app'
import PostPreview from "./preview-templates/PostPreview"
import styles from "../styles/blog.css";

CMS.registerPreviewStyle(styles.toString(), { raw: true });
CMS.registerPreviewTemplate('blogTr', PostPreview)
CMS.registerPreviewTemplate('blogEn', PostPreview)
CMS.init();