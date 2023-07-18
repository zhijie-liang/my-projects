import random

def start_game():
    mat = [[0]*4 for _ in range(4)]
    print("Command: 'W' or 'w' - up, 'S' or 's' - down, 'A' or 'a' - left, 'D' or 'd' - right, 'Q' or 'q' - exit")
    print("Start the game!")
    insert_2_or_4(mat, 'init')
    return mat

def compress(mat):
    new_mat = [[0]*4 for _ in range(4)]
    for i in range(4):
        pos = 0
        for j in range(4):
            if mat[i][j] != 0:
                new_mat[i][pos] = mat[i][j]
                pos += 1
    return new_mat

def merge(mat):
    for i in range(4):
        for j in range(3):
            if mat[i][j] == mat[i][j + 1] and mat[i][j] != 0:
                mat[i][j] = mat[i][j]*2
                mat[i][j + 1] = 0
    return mat

def reverse(mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[i][3 - j])
    return new_mat

def transpose(mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[j][i])
    return new_mat

def check_if_can_move(mat):
    for i in range(4):
        for j in range(3):
            if mat[i][j] == mat[i][j + 1]:
                return True
    for i in range(3):
        for j in range(4):
            if mat[i][j] == mat[i + 1][j]:
                return True
    return False

def insert_2_or_4(mat, cmd):
    r, c = random.randint(0, 3), random.randint(0, 3)
    while mat[r][c] != 0:
        r, c = random.randint(0, 3), random.randint(0, 3)
    mat[r][c] = random.randint(1, 2)*2
    return mat

def get_current_state(mat):
    for i in range(4):
        for j in range(4):
            if mat[i][j] == 2048:
                return 'WIN'
    if any(0 in row for row in mat):
        return 'GAME NOT OVER'
    elif check_if_can_move(mat):
        return 'GAME NOT OVER'
    else:
        return 'LOSE'

def print_grid(mat):
    print("---------------------")
    for i in range(4):
        for j in range(4):
            if mat[i][j] == 0:
                print("|     ", end='')
            else:
                print(f"| {mat[i][j]:4} ", end='')
        print("|")
        print("---------------------")

def play_game():
    mat = start_game()
    while True:
        print_grid(mat)
        move = input("Your Move: ")
        if move == 'q' or move == 'Q':
            break
        mat = compress(mat)
        if move == 'w' or move == 'W':
            mat = merge(mat)
            mat = compress(mat)
        elif move == 's' or move == 'S':
            mat = reverse(mat)
            mat = merge(mat)
            mat = reverse(mat)
            mat = compress(mat)
        elif move == 'a' or move == 'A':
            mat = transpose(mat)
            mat = merge(mat)
            mat = transpose(mat)
            mat = compress(mat)
        elif move == 'd' or move == 'D':
            mat = transpose(mat)
            mat = reverse(mat)
            mat = merge(mat)
            mat = reverse(mat)
            mat = transpose(mat)
            mat = compress(mat)
        mat = insert_2_or_4(mat, move)
        current_state = get_current_state(mat)
        if current_state == 'WIN':
            print_grid(mat)
            print("You Won!")
            break
        elif current_state == 'LOSE':
            print_grid(mat)
            print("You Lost!")
            break

if __name__ == "__main__":
    play_game()
