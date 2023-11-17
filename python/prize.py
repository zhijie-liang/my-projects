
def check_prize(winning_numbers, user_numbers):
    """Check the lottery prize level based on the user's numbers and the winning numbers."""
    match_count = len(set(winning_numbers) & set(user_numbers))

    if match_count == 6:
        return "一等奖"
    elif match_count == 5:
        return "二等奖"
    elif match_count == 4:
        return "三等奖"
    elif match_count == 3:
        return "四等奖"
    else:
        return "抱歉"


def main():
    print("Welcome to the Lottery Checker!")
    winning_numbers = input(
        "输入中奖号码 (空格分开): ")
    user_numbers = input("输入您的号码 (空格分开): ")

    winning_numbers = [int(num) for num in winning_numbers.split()]
    user_numbers = [int(num) for num in user_numbers.split()]

    prize = check_prize(winning_numbers, user_numbers)
    print(f"结果: {prize}")


if __name__ == "__main__":
    main()