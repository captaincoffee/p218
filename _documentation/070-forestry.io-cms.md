---
title: Forestry.io CMS
---

## Why a Content Management System (CMS) ?

Well, it's Fun to hack Jekyll in the text editor and with the command line. Geeking is cool !

But, it's sometimes difficult, after a few days, to remenber how things are working. "*How do I commit to Github ? What is the mardown syntax for bold ?*". Even when it's your job, you will commit errors.

And as a site owner, you mainly only need to publish.

That's why, I think a CMS is cool, it allows you to focus on the job : producing good content.

## Why Forestry.io ?

As everything is ok between github for versioning and Netlify for deployment, we just need a Content Management System.


From a developer stand point :
 - open source
 - secure
 - free for open source projects
 - hackable

From a client stand-point :
 - usability and accessibility
 - documented
 - stable


siteleaf.com
cloudcanon.com
forestry.io
netlify.cms



## Using Forestry.io CMS

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
