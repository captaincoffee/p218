---
title: Netlify CMS
---

## Using Netlify CMS

### Constraints

NCMS cannot read collections files in folder.
All files must be at the root.

Data files cannot be simple array like :

    - { name: "Article", plural: "Articles", slug: "article", icon: "fi-page" }
    - { name: "Video", plural: "Videos", slug: "video", icon: "fi-video" }


A root element is mandatory, due to configuration architecture :

    article_types:
      - { name: "Article", plural: "Articles", slug: "article", icon: "fi-page" }
      - { name: "Video", plural: "Videos", slug: "video", icon: "fi-video" }

From admin/config.yml

    - name: "kbSetup"
      label: "KB setup"
      files:

        - name: "kbSetup"
          label: "KB setup"
          file: "_data/kb_setup.yml"
          fields:
            - ...
            - label: Article Type
              name: article_types
              widget: list
              fields:
                - {label: Name, name: name, widget: string}
                - {label: Plural, name: plural, widget: string}
                - {label: Slug, name: slug, widget: string}
                - {label: Icon, name: icon, widget: string}
