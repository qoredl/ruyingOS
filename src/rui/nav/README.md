# 数据模型
Nav与SwitchTab数据模型一样

```
{
	curIndex: 0,
	navs: [
		{ text: 'index', href: '#/', iconName: 'edit' },
		{ text: '导航二', href: ''},
		{
			text: '导航三',
			navData: {
				navs: [
					{ text: '子菜单', href: '' },
					{ text: '子菜单', href: '' },
					{ text: '子菜单', href: '' },
					{ text: '子菜单', href: '' },
				]
			}
		},
		{ text: 'wrap', href: '#/wrap' },
	],
	item: [
		'内容一',
		'内容二',
		'内容三',
		'内容四',
	]
}
```

