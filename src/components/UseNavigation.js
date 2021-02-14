import { useStaticQuery, graphql } from "gatsby"
import { useLocale } from "../hooks/locale"

const UseNavigation = () => {
  // Grab the locale (passed through context) from the Locale Provider
  // through useLocale() hook
  const { locale } = useLocale()
  // Query the JSON files in <rootDir>/config/navigations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData.edges.map(item => {
    return {
      name: item.node.name,
      navigations: item.node.translations.navigations
    }
  })

  // Only return translations for the current locale
  const { navigations } = simplified.filter(
    lang => lang.name === locale
  )[0]

  return navigations
}

export default UseNavigation

const query = graphql`
    query useNavigation {
        rawData: allFile(
            filter: { sourceInstanceName: { eq: "navigations" } }
        ) {
            edges {
                node {
                    name
                    translations: childNavigationsJson {
                       navigations{
                           label
                           url
                       }
                    }
                }
            }
        }
    }
`
