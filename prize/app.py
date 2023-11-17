from flask import Flask, request, jsonify, render_template

app = Flask(__name__)


def check_prize(user_numbers, user_blue, winning_numbers, winning_blue):
    match_count_red = len(set(winning_numbers) & set(user_numbers))
    match_blue = winning_blue == user_blue

    if match_count_red == 6 and match_blue:
        return "一等奖"
    elif match_count_red == 6:
        return "二等奖"
    elif match_count_red == 5 and match_blue:
        return "三等奖"
    elif (match_count_red == 5) or (match_count_red == 4 and match_blue):
        return "四等奖"
    elif (match_count_red == 4) or (match_count_red == 3 and match_blue):
        return "五等奖"
    elif match_blue:
        return "六等奖"
    else:
        return "未中奖"


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/check-prize', methods=['POST'])
def check():
    data = request.json
    user_numbers = data['userNumbers']
    user_blue = data['userBlue']
    # 您可以在这里设置固定的中奖号码，或者改为从某个来源获取
    winning_numbers = [1, 2, 3, 4, 5, 6]
    winning_blue = 7
    prize = check_prize(user_numbers, user_blue, winning_numbers, winning_blue)
    return jsonify({'prize': prize})


if __name__ == '__main__':
    app.run(debug=True)
