while True:
    num = int(input("Enter a number: "))
    if num == 0:
        break
    if num < 0:
        continue
    print(f"Square is {num ** 2}")
