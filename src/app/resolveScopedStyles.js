const resolveScopedStyles = scope => ({
  className: scope.props.className,
  wrapClassName: (...classNames) => [scope.props.className, ...classNames].filter(Boolean).join(' '),
  styles: () => scope.props.children,
})

export default (styles, Component) => {
  const styled = resolveScopedStyles(
    <scope>
      <style jsx>{styles}</style>
    </scope>
  )

  if (Component) {
    return (props) => {
      const { className, children, ...otherProps } = props
      const classes = [styled.className, className].filter(Boolean).join(' ')

      return (
        <Component className={classes} {...otherProps}>
          {children}

          <styled.styles />
        </Component>
      )
    }
  }

  return styled
}
