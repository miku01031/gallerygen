export type AppLanguage = "en" | "zh";

type Dictionary = {
  common: {
    appName: string;
    close: string;
    remove: string;
    continueEditing: string;
    openNetlifyDrop: string;
    copied: string;
    copySnippet: string;
    exportReady: string;
    waitingForPhotos: string;
    ready: string;
    disabled: string;
    active: string;
  };
  header: {
    tagline: string;
    help: string;
    exportZip: string;
    exporting: string;
    languageToggleLabel: string;
    builderTheme: string;
  };
  themeToggle: {
    auto: string;
    light: string;
    dark: string;
  };
  helpPanel: {
    title: string;
    description: string;
  };
  pageDrag: {
    badge: string;
    title: string;
    description: string;
  };
  status: {
    label: string;
    title: string;
    readyDescription: string;
    emptyDescription: string;
    photos: string;
    template: string;
    export: string;
  };
  livePreview: {
    label: string;
    title: string;
    description: (templateLabel: string) => string;
    activeTemplate: (templateLabel: string) => string;
    readyForUpload: string;
    totalAssets: string;
    imageAssets: string;
    htmlLength: string;
    cssLength: string;
  };
  dropzone: {
    eyebrow: string;
    title: string;
    description: string;
    dropTitle: string;
    dropDescription: string;
    chooseImages: string;
    chooseFolder: string;
    uploadOrderHint: string;
    localFirst: string;
    browserProcessing: string;
    zipExport: string;
  };
  siteMeta: {
    label: string;
    title: string;
    description: string;
    template: string;
    active: string;
    templateDescription: string;
    galleryTitle: string;
    galleryTitlePlaceholder: string;
    galleryDescription: string;
    galleryDescriptionPlaceholder: string;
    galleryTheme: string;
    galleryThemeDescription: string;
    projectUrl: string;
    projectUrlPlaceholder: string;
    projectUrlHelp: string;
    editorial: string;
    showcase: string;
  };
  exportSuccess: {
    badge: string;
    title: string;
    subtitle: string;
    nextSteps: string;
    deployTitle: string;
    deployDescription: string;
    unzipTitle: string;
    unzipDescription: (zipFileName: string) => string;
    deployStepTitle: string;
    deployStepDescription: string;
    deployStepHint: string;
    deployStepNote: string;
    githubPagesTitle: string;
    githubPagesDescription: string;
    githubPagesHint: string;
    githubPagesAction: string;
    shareTitle: string;
    shareHeading: string;
    shareDescription: string;
    shareHint: string;
    bottomSummary: (photoCount: number) => string;
  };
  templates: {
    default: {
      untitled: string;
      fallbackDescription: string;
      imageAlt: (index: number) => string;
      footerNote: string;
      emptyTitle: string;
      emptyDescription: string;
    };
    showcase: {
      untitled: string;
      fallbackDescription: string;
      imageTitle: (index: number) => string;
      imageAlt: (index: number) => string;
      footerNote: string;
      projectLinkLabel: string;
      emptyTitle: string;
      emptyDescription: string;
      leadVisual: string;
      featureTitleFallback: (index: number) => string;
    };
  };
};

const dictionaries: Record<AppLanguage, Dictionary> = {
  en: {
    common: {
      appName: "GalleryGen",
      close: "Close",
      remove: "Remove",
      continueEditing: "Keep editing",
      openNetlifyDrop: "Open Netlify Drop",
      copied: "Copied!",
      copySnippet: "Copy snippet",
      exportReady: "Export ready",
      waitingForPhotos: "Waiting for photos",
      ready: "Ready",
      disabled: "Disabled",
      active: "Active",
    },
    header: {
      tagline: "Offline-first static gallery builder",
      help: "Help",
      exportZip: "Export ZIP",
      exporting: "Exporting...",
      languageToggleLabel: "Switch language",
      builderTheme: "Builder Theme",
    },
    themeToggle: {
      auto: "Auto",
      light: "Light",
      dark: "Dark",
    },
    helpPanel: {
      title: "What GalleryGen does",
      description:
        "GalleryGen keeps image processing in your browser so you can import photos, preview a polished gallery, and export a deployable ZIP quickly.",
    },
    pageDrag: {
      badge: "Drop to upload",
      title: "Release your images anywhere in the builder",
      description:
        "GalleryGen will add them to the current project and update the live preview instantly.",
    },
    status: {
      label: "Builder status",
      title: "Project snapshot",
      readyDescription: "Your project is ready to preview live and export as a static gallery.",
      emptyDescription: "Add images to unlock the live preview and export workflow.",
      photos: "Photos",
      template: "Template",
      export: "Export",
    },
    livePreview: {
      label: "Live preview",
      title: "Site preview",
      description: (templateLabel) =>
        `The active ${templateLabel.toLowerCase()} template reads directly from the shared GalleryProject state used for export.`,
      activeTemplate: (templateLabel) => `${templateLabel} active`,
      readyForUpload: "Ready for upload",
      totalAssets: "Total assets",
      imageAssets: "Image assets",
      htmlLength: "HTML length",
      cssLength: "CSS length",
    },
    dropzone: {
      eyebrow: "Start with your photos",
      title: "Drag a folder of images or multiple photos here.",
      description:
        "Build a polished static gallery locally in the browser. No upload queue, no account, and no backend in the middle.",
      dropTitle: "Drop images here, or anywhere in the builder, to start instantly",
      dropDescription:
        "Select images, or choose a folder in supported browsers.",
      chooseImages: "Choose Images",
      chooseFolder: "Choose Folder",
      uploadOrderHint: "Images keep the same order as upload.",
      localFirst: "Local-first workflow",
      browserProcessing: "Image processing stays in the browser",
      zipExport: "Static gallery ZIP export",
    },
    siteMeta: {
      label: "Gallery settings",
      title: "Site metadata",
      description:
        "Update the shared gallery settings used by both the live preview and export output.",
      template: "Template",
      active: "Active",
      templateDescription:
        "Switch between the editorial archive layout and the structured screenshot showcase.",
      galleryTitle: "Gallery title",
      galleryTitlePlaceholder: "Summer Collection",
      galleryDescription: "Gallery description",
      galleryDescriptionPlaceholder: "A small static gallery built from local images.",
      galleryTheme: "Gallery Theme",
      galleryThemeDescription:
        "Controls the preview and exported gallery theme, not the editor appearance.",
      projectUrl: "Project URL",
      projectUrlPlaceholder: "https://github.com/your-name/your-project",
      projectUrlHelp:
        "Template B only. This link appears at the bottom of the exported showcase page.",
      editorial: "Editorial",
      showcase: "Showcase",
    },
    exportSuccess: {
      badge: "Export complete",
      title: "Your static showcase is ready",
      subtitle:
        "The ZIP you just downloaded already includes everything needed to publish this gallery: HTML, CSS, and image assets.",
      nextSteps: "Next step",
      deployTitle: "Get a public link",
      deployDescription:
        "You already have a complete static website. Unzip it to preview locally, or upload it to Netlify to get a shareable public link in seconds.",
      unzipTitle: "Unzip the archive",
      unzipDescription: (zipFileName) =>
        `Extract ${zipFileName} into a local folder.`,
      deployStepTitle: "Upload it to Netlify",
      deployStepDescription:
        "Open Netlify Drop and drag the extracted folder into it. Once published, you will immediately get a *.netlify.app URL.",
      deployStepHint:
        "You can share this link directly, or add it to your GitHub README, project page, or portfolio.",
      deployStepNote:
        "No command line is required. If you sign in, you can keep and update the same link over time.",
      githubPagesTitle: "GitHub Pages (best for long-term project hosting)",
      githubPagesDescription:
        "If you want to keep the showcase alongside your GitHub project, upload the exported files to a repository and enable GitHub Pages.",
      githubPagesHint:
        "A good fit for open-source projects, project docs, and long-term showcase links.",
      githubPagesAction: "View GitHub Pages guide",
      shareTitle: "After deployment",
      shareHeading: "README snippet generator",
      shareDescription:
        "After you get the public URL, paste the snippet below into your GitHub README, project page, or portfolio.",
      shareHint:
        "Before using it, replace the example deployed link with your own public URL.",
      bottomSummary: (photoCount) =>
        `${photoCount} images packaged successfully. You can keep editing, or get a shareable public link now.`,
    },
    templates: {
      default: {
        untitled: "Untitled Gallery",
        fallbackDescription:
          "A quiet portfolio gallery generated from local images and prepared for simple static publishing.",
        imageAlt: (index) => `Gallery image ${index}`,
        footerNote: "Exported with GalleryGen",
        emptyTitle: "Your editorial gallery will appear here",
        emptyDescription:
          "Add a set of images to generate a modern editorial masonry gallery with quiet typography and image-first presentation.",
      },
      showcase: {
        untitled: "Untitled Showcase",
        fallbackDescription:
          "A structured visual showcase generated from local screenshots, mockups, and product imagery.",
        imageTitle: (index) => `Image ${index}`,
        imageAlt: (index) => `Showcase image ${index}`,
        footerNote: "Exported with GalleryGen",
        projectLinkLabel: "View project",
        emptyTitle: "Your product showcase will appear here",
        emptyDescription:
          "Add screenshots, mockups, or portfolio visuals to generate a structured showcase page with a strong lead image and a clean supporting grid.",
        leadVisual: "Lead visual",
        featureTitleFallback: (index) => `Screenshot ${index}`,
      },
    },
  },
  zh: {
    common: {
      appName: "GalleryGen",
      close: "关闭",
      remove: "移除",
      continueEditing: "继续编辑",
      openNetlifyDrop: "打开 Netlify Drop",
      copied: "已复制！",
      copySnippet: "复制片段",
      exportReady: "可导出",
      waitingForPhotos: "等待图片",
      ready: "就绪",
      disabled: "禁用",
      active: "当前",
    },
    header: {
      tagline: "离线优先的静态图库构建器",
      help: "帮助",
      exportZip: "导出 ZIP",
      exporting: "导出中...",
      languageToggleLabel: "切换语言",
      builderTheme: "编辑器主题",
    },
    themeToggle: {
      auto: "自动",
      light: "浅色",
      dark: "深色",
    },
    helpPanel: {
      title: "GalleryGen 能做什么",
      description:
        "GalleryGen 会在浏览器中完成图片处理，让你可以快速导入图片、预览精致图库，并导出可部署的 ZIP。",
    },
    pageDrag: {
      badge: "拖放上传",
      title: "在构建器任意位置松开即可导入图片",
      description: "GalleryGen 会把这些图片加入当前项目，并立即刷新实时预览。",
    },
    status: {
      label: "构建状态",
      title: "项目快照",
      readyDescription: "当前项目已经可以实时预览，并导出为静态图库。",
      emptyDescription: "添加图片后即可解锁实时预览与导出流程。",
      photos: "图片",
      template: "模板",
      export: "导出",
    },
    livePreview: {
      label: "实时预览",
      title: "站点预览",
      description: (templateLabel) =>
        `当前 ${templateLabel} 模板直接读取用于导出的共享 GalleryProject 状态。`,
      activeTemplate: (templateLabel) => `${templateLabel} 已启用`,
      readyForUpload: "等待上传",
      totalAssets: "总资源数",
      imageAssets: "图片资源",
      htmlLength: "HTML 长度",
      cssLength: "CSS 长度",
    },
    dropzone: {
      eyebrow: "从你的图片开始",
      title: "将整组图片文件夹或多张图片拖到这里。",
      description:
        "直接在浏览器本地生成精致的静态图库。没有上传队列、没有账号，也不需要后端。",
      dropTitle: "把图片拖到这里，或拖到构建器任意位置，立即开始",
      dropDescription: "可选择图片文件，部分浏览器支持直接选择文件夹。",
      chooseImages: "选择图片",
      chooseFolder: "选择文件夹",
      uploadOrderHint: "当前展示顺序与上传顺序一致。",
      localFirst: "本地优先工作流",
      browserProcessing: "图片处理全程在浏览器中完成",
      zipExport: "导出静态图库 ZIP",
    },
    siteMeta: {
      label: "图库设置",
      title: "站点元数据",
      description: "更新实时预览与导出结果共用的画廊设置。",
      template: "模板",
      active: "当前",
      templateDescription: "在编辑感归档布局与结构化展示模板之间切换。",
      galleryTitle: "图库标题",
      galleryTitlePlaceholder: "夏日作品集",
      galleryDescription: "图库描述",
      galleryDescriptionPlaceholder: "一个由本地图片生成的小型静态图库。",
      galleryTheme: "画廊主题",
      galleryThemeDescription: "控制预览和导出后的展示页主题，不影响编辑器界面。",
      projectUrl: "项目主页链接",
      projectUrlPlaceholder: "https://github.com/your-name/your-project",
      projectUrlHelp: "仅用于 Template B。会在导出后的展示页底部显示一个项目入口链接。",
      editorial: "编辑感",
      showcase: "展示型",
    },
    exportSuccess: {
      badge: "导出完成",
      title: "静态展示页已生成",
      subtitle: "你刚下载的 ZIP 已包含可直接发布的 HTML、CSS 和图片资源。",
      nextSteps: "下一步",
      deployTitle: "获取公开链接",
      deployDescription: "你现在已经拿到了一个完整的静态网站。解压后可以本地查看，也可以上传到 Netlify，几秒钟获得一个可分享的公开链接。",
      unzipTitle: "解压 ZIP",
      unzipDescription: (zipFileName) => `将下载得到的 ${zipFileName} 解压到本地文件夹。`,
      deployStepTitle: "上传到 Netlify",
      deployStepDescription: "打开 Netlify Drop，把解压后的文件夹直接拖进去。发布完成后，你会立即获得一个 *.netlify.app 链接。",
      deployStepHint: "这个链接可以直接分享，也可以放到 GitHub README、项目主页或作品集页面中。",
      deployStepNote: "无需命令行即可完成发布。登录后还可以长期保留和更新这个链接。",
      githubPagesTitle: "GitHub Pages（适合长期维护）",
      githubPagesDescription:
        "如果你想把展示页长期挂在 GitHub 项目旁边，可以把导出的文件上传到仓库，并启用 GitHub Pages。",
      githubPagesHint: "更适合开源项目、项目文档和长期维护的展示链接。",
      githubPagesAction: "查看 GitHub Pages 指引",
      shareTitle: "部署后",
      shareHeading: "README 片段生成器",
      shareDescription: "拿到公开链接后，把下面这段内容粘贴到 GitHub README、项目主页或作品集页面。",
      shareHint: "使用前请先把示例中的部署链接替换成你自己的公开地址。",
      bottomSummary: (photoCount) =>
        `已打包 ${photoCount} 张图片。你可以继续编辑，也可以现在去获取一个可分享的公开链接。`,
    },
    templates: {
      default: {
        untitled: "未命名图库",
        fallbackDescription: "一个由本地图片生成、可直接静态发布的安静作品集图库。",
        imageAlt: (index) => `图库图片 ${index}`,
        footerNote: "由 GalleryGen 导出",
        emptyTitle: "你的编辑感图库会显示在这里",
        emptyDescription: "添加一组图片后，这里会生成具有现代编辑感、纯图片优先的瀑布流图库。",
      },
      showcase: {
        untitled: "未命名展示集",
        fallbackDescription: "一个由本地截图、样机图和产品视觉素材生成的结构化展示页面。",
        imageTitle: (index) => `图片 ${index}`,
        imageAlt: (index) => `展示图片 ${index}`,
        footerNote: "由 GalleryGen 导出",
        projectLinkLabel: "查看项目",
        emptyTitle: "你的产品展示页会显示在这里",
        emptyDescription: "添加截图、样机图或作品视觉后，这里会生成带主视觉和辅助网格的结构化展示页面。",
        leadVisual: "主视觉",
        featureTitleFallback: (index) => `截图 ${index}`,
      },
    },
  },
};

export function getDictionary(language: AppLanguage): Dictionary {
  return dictionaries[language];
}

export function getReadmeSnippet(language: AppLanguage): string {
  if (language === "zh") {
    return `## 📸 视觉展示

查看完整项目展示页：[点这里](在这里替换为你的部署链接)

<div align="right">
  <i>由 <a href="REPLACE_WITH_GALLERYGEN_REPO_LINK">GalleryGen</a> 生成</i>
</div>`;
  }

  return `## 📸 Showcase

View the full project gallery here: [Open Gallery](PASTE_YOUR_DEPLOYED_LINK_HERE)

<div align="right">
  <i>Generated with <a href="REPLACE_WITH_GALLERYGEN_REPO_LINK">GalleryGen</a></i>
</div>`;
}

export function getPhotoCountLabel(language: AppLanguage, photoCount: number): string {
  if (language === "zh") {
    return `${photoCount} 张图片`;
  }

  return `${photoCount} image${photoCount === 1 ? "" : "s"}`;
}
